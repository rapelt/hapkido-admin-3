// Copied from github.com/gnucoop/ionic2-extra
// tslint:disable:no-use-before-declare

import {
    AfterContentInit,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    OnDestroy,
    Output,
    SimpleChanges,
    OnChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, Form } from '@angular/forms';

import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Moment } from 'moment';

const momentConstructor: (value?: any) => moment.Moment =
    (moment as any).default || moment;

const weekDays: string[] = [
    '',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
];

export type IonCalendarViewMode = 'month' | 'year' | 'decade';
export type IonCalendarPeriodType = 'day' | 'week' | 'month' | 'year';
export type IonCalendarEntryType = 'day' | 'month' | 'year';
export type IonCalendarWeekDay =
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';
export type IonCalendarEntrySelectedState = 'none' | 'partial' | 'full';

export class IonCalendarPeriod {
    type: IonCalendarPeriodType;
    startDate: Date;
    endDate: Date;
}

export class IonCalendarChange {
    source: IonCalendar;
    selectedValues: Date[];
    selectedValue: Date;
}

export class IonCalendarEntry {
    type: IonCalendarEntryType;
    date: Date;
    selected: IonCalendarEntrySelectedState;
    disabled = false;
    highlight = false;

    constructor(params: {
        type: IonCalendarEntryType;
        date: Date;
        selected: IonCalendarEntrySelectedState;
        highlight?: boolean;
        disabled?: boolean;
    }) {
        const keys = Object.keys(params);

        this.type = params.type;
        this.date = params.date;
        this.selected = params.selected;
        if (keys.indexOf('disabled') > -1) {
            this.disabled = params.disabled;
        }
        if (keys.indexOf('highlight') > -1) {
            this.highlight = params.highlight;
        }
    }

    toString(): string {
        if (this.type === 'day') {
            return `${this.date.getDate()}`;
        }
        if (this.type === 'month') {
            return momentConstructor(this.date).format('MMM');
        }
        return `${this.date.getFullYear()}`;
    }

    getRange(): { start: moment.Moment; end: moment.Moment } {
        if (this.type === 'day') {
            const day: moment.Moment = momentConstructor(this.date);
            return { start: day, end: day };
        } else {
            const curMoment: moment.Moment = momentConstructor(this.date);
            return {
                start: curMoment.clone().startOf(this.type),
                end: curMoment.clone().endOf(this.type),
            };
        }
    }
}

export const ION_CALENDAR_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IonCalendar),
    multi: true,
};

@Component({
    selector: 'calendar',
    templateUrl: 'calendar.html',
    styleUrls: ['./calendar.scss'],
    providers: [ION_CALENDAR_CONTROL_VALUE_ACCESSOR],
})
export class IonCalendar
    implements
        AfterContentInit,
        ControlValueAccessor,
        OnInit,
        OnDestroy,
        OnChanges {
    get viewDate(): Date {
        return this._viewDate;
    }
    @Input('view-date')
    set viewDate(viewDate: Date) {
        this._setViewDate(viewDate);
    }
    get disabled(): boolean {
        return this._disabled;
    }
    @Input()
    set disabled(disabled: boolean) {
        this._disabled = disabled != null && `${disabled}` !== 'false';
    }
    get dateOnlyForDay(): boolean {
        return this._disabled;
    }
    @Input()
    set dateOnlyForDay(dateOnlyForDay: boolean) {
        this._dateOnlyForDay =
            dateOnlyForDay != null && `${dateOnlyForDay}` !== 'false';
    }
    get viewMode(): IonCalendarViewMode {
        return this._viewMode;
    }
    @Input('view-mode')
    set viewMode(viewMode: IonCalendarViewMode) {
        this._viewMode = viewMode;
        this._buildCalendar();
    }
    get selectionMode(): IonCalendarPeriodType {
        return this._selectionMode;
    }
    @Input('selection-mode')
    set selectionMode(selectionMode: IonCalendarPeriodType) {
        this._selectionMode = selectionMode;
    }
    get startOfWeekDay(): IonCalendarWeekDay {
        return weekDays[this._startOfWeekDay] as IonCalendarWeekDay;
    }
    @Input('start-of-week-day')
    set startOfWeekDay(weekDay: IonCalendarWeekDay) {
        this._startOfWeekDay = weekDays.indexOf(weekDay);

        (moment as any).updateLocale(moment.locale(), {
            week: { dow: this._startOfWeekDay },
        });

        if (this._viewMode === 'month') {
            this._buildCalendar();
        }
    }
    get minDate(): Date {
        return this._minDate;
    }
    @Input()
    set minDate(minDate: Date) {
        this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
    }
    get maxDate(): Date {
        return this._maxDate;
    }
    @Input()
    set maxDate(maxDate: Date) {
        this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
    }
    @Output()
    get change(): Observable<IonCalendarChange> {
        return this._change.asObservable();
    }
    private set selectedPeriod(period: IonCalendarPeriod) {
        this._selectedPeriod = period;
        this._change.emit({
            source: this,
            selectedValues: this.selectedValues,
            selectedValue: this._selectedPeriod.startDate,
        });
        this._refreshSelection();
    }

    @Input()
    set selectionType(type: string) {
        this._selectionType = type ? type : 'single';
    }

    @Input()
    set preselectedValues(preselectedValues: Moment[]) {
        this._preselectedValues = preselectedValues ? preselectedValues : [];
    }

    get preselectedValues(): Moment[] {
        return this._preselectedValues;
    }

    // End My Code

    get value(): IonCalendarPeriod | Date {
        if (this._dateOnlyForDay && this.selectionMode === 'day') {
            return this._selectedPeriod != null
                ? this._selectedPeriod.startDate
                : null;
        }

        return this._selectedPeriod;
    }

    set value(period: IonCalendarPeriod | Date) {
        if (this._dateOnlyForDay && this.selectionMode === 'day') {
            if (
                period instanceof Date &&
                (this._selectedPeriod == null ||
                    period !== this._selectedPeriod.startDate)
            ) {
                this.selectedPeriod = {
                    type: 'day',
                    startDate: period,
                    endDate: period,
                };
                if (this._init) {
                    this.ionChange.emit(this);
                }
                this._onChangeCallback(period);
            }
        } else if (
            period instanceof Object &&
            period !== this._selectedPeriod
        ) {
            this.selectedPeriod = period as IonCalendarPeriod;
            if (this._init) {
                this.ionChange.emit(this);
            }
            this._onChangeCallback(period);
        }
    }

    public get calendarRows(): IonCalendarEntry[][] {
        return this._calendarRows;
    }
    public get viewHeader(): string {
        return this._viewHeader;
    }
    public get weekDays(): string[] {
        return this._weekDays;
    }

    constructor() {
        // _form.register(this.ionicFormInput);
    }
    ionicFormInput: Input;

    @Output() ionChange: EventEmitter<IonCalendar> = new EventEmitter<
        IonCalendar
    >();

    private _disabled = false;

    private _dateOnlyForDay = false;

    private _viewMode: IonCalendarViewMode = 'month';

    private _selectionMode: IonCalendarPeriodType = 'day';

    private _startOfWeekDay = 1;

    private _minDate: Date;

    private _maxDate: Date;

    private _change: EventEmitter<IonCalendarChange> = new EventEmitter<
        IonCalendarChange
    >();

    private _selectedPeriod: IonCalendarPeriod;

    // Start My Code

    _selectionType = '';

    _preselectedValues: Moment[];

    selectedValues: Date[] = [];

    private _viewDate: Date = new Date();
    private _viewMoment: moment.Moment = momentConstructor();
    private _viewHeader = '';

    private _calendarRows: IonCalendarEntry[][] = [];
    private _weekDays: string[] = [];
    private _init: boolean;

    addDateToValues(value: Date) {
        this.selectedValues.push(value);
    }

    removeDateFromValues(index: number) {
        if (index != null) {
            this.selectedValues.splice(index, 1);
        }
    }

    isInSelectedValues(date) {
        let selectedIndex = null;
        this.selectedValues.forEach((item, index) => {
            if (moment(item).isSame(date, 'day')) {
                selectedIndex = index;
            }
        });
        return selectedIndex;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.ngOnInit();
    }

    isInPreselecteValues(date) {
        let selectedIndex = null;
        this.preselectedValues.forEach((item, index) => {
            const md = moment(date);
            if (moment(item).isSame(md, 'day')) {
                selectedIndex = index;
            }
        });
        return selectedIndex;
    }

    shouldAddOrRemoveDate(date: Date) {
        const selectedValuesIndex = this.isInSelectedValues(date);

        if (selectedValuesIndex !== null) {
            this.removeDateFromValues(selectedValuesIndex);
        }

        if (selectedValuesIndex === null) {
            this.addDateToValues(date);
        }
    }

    dayColour(day): string {
        let colour = '';

        if (day.selected === 'full') {
            colour = colour + 'primary';
        }
        if (day.highlight) {
            colour = colour + ' secondary';
        }

        if (day.selected === 'partial') {
            colour = colour + ' tertiary';
        }

        if (colour === '') {
            colour = 'light';
        }

        return colour;
    }

    prevPage(): void {
        if (this._viewMode === 'month') {
            this.viewDate = momentConstructor(this.viewDate)
                .subtract(1, 'M')
                .toDate();
        } else if (this._viewMode === 'year') {
            this.viewDate = momentConstructor(this.viewDate)
                .subtract(1, 'y')
                .toDate();
        }
        this._buildCalendar();
    }

    nextPage(): void {
        if (this._viewMode === 'month') {
            this.viewDate = momentConstructor(this.viewDate)
                .add(1, 'M')
                .toDate();
        } else if (this._viewMode === 'year') {
            this.viewDate = momentConstructor(this.viewDate)
                .add(1, 'y')
                .toDate();
        }
        this._buildCalendar();
    }

    previousViewMode(): void {
        if (this._viewMode === 'decade') {
            return;
        } else if (this._viewMode === 'year') {
            this._viewMode = 'decade';
        } else if (this._viewMode === 'month') {
            this._viewMode = 'year';
        }
        this._buildCalendar();
    }

    selectEntry(entry: IonCalendarEntry): void {
        if (this._selectionType === 'single') {
            if (!this._canSelectEntry(entry)) {
                return this._nextViewMode(entry);
            }

            let newPeriod: IonCalendarPeriod | Date;
            if (this._isEntrySelected(entry) === 'full') {
                newPeriod = null;
            } else if (this._selectionMode === 'day') {
                if (this._dateOnlyForDay) {
                    newPeriod = entry.date;
                } else {
                    newPeriod = {
                        type: 'day',
                        startDate: entry.date,
                        endDate: entry.date,
                    };
                }
            } else if (this._selectionMode === 'week') {
                newPeriod = {
                    type: 'week',
                    startDate: new Date(
                        momentConstructor(entry.date)
                            .startOf('week')
                            .toDate()
                            .valueOf()
                    ),
                    endDate: new Date(
                        momentConstructor(entry.date)
                            .endOf('week')
                            .toDate()
                            .valueOf()
                    ),
                };
            } else if (this._selectionMode === 'month') {
                newPeriod = {
                    type: 'month',
                    startDate: new Date(
                        momentConstructor(entry.date)
                            .startOf('month')
                            .toDate()
                            .valueOf()
                    ),
                    endDate: new Date(
                        momentConstructor(entry.date)
                            .endOf('month')
                            .toDate()
                            .valueOf()
                    ),
                };
            } else if (this._selectionMode === 'year') {
                newPeriod = {
                    type: 'year',
                    startDate: new Date(
                        momentConstructor(entry.date)
                            .startOf('year')
                            .toDate()
                            .valueOf()
                    ),
                    endDate: new Date(
                        momentConstructor(entry.date)
                            .endOf('year')
                            .toDate()
                            .valueOf()
                    ),
                };
            }
            this.value = newPeriod;
        }

        if (this._selectionType === 'multiple') {
            if (!this._canSelectEntry(entry)) {
                return this._nextViewMode(entry);
            }

            this.shouldAddOrRemoveDate(entry.date);

            let newPeriod: IonCalendarPeriod;

            if (this._isEntrySelected(entry) === 'full') {
                newPeriod = {
                    type: 'day',
                    startDate: entry.date,
                    endDate: entry.date,
                };
            } else if (this._selectionMode === 'day') {
                if (this._dateOnlyForDay) {
                    // newPeriod = entry.date;
                } else {
                    newPeriod = {
                        type: 'day',
                        startDate: entry.date,
                        endDate: entry.date,
                    };
                }
            } else if (this._selectionMode === 'week') {
                newPeriod = {
                    type: 'week',
                    startDate: new Date(
                        momentConstructor(entry.date)
                            .startOf('week')
                            .toDate()
                            .valueOf()
                    ),
                    endDate: new Date(
                        momentConstructor(entry.date)
                            .endOf('week')
                            .toDate()
                            .valueOf()
                    ),
                };
            } else if (this._selectionMode === 'month') {
                newPeriod = {
                    type: 'month',
                    startDate: new Date(
                        momentConstructor(entry.date)
                            .startOf('month')
                            .toDate()
                            .valueOf()
                    ),
                    endDate: new Date(
                        momentConstructor(entry.date)
                            .endOf('month')
                            .toDate()
                            .valueOf()
                    ),
                };
            } else if (this._selectionMode === 'year') {
                newPeriod = {
                    type: 'year',
                    startDate: new Date(
                        momentConstructor(entry.date)
                            .startOf('year')
                            .toDate()
                            .valueOf()
                    ),
                    endDate: new Date(
                        momentConstructor(entry.date)
                            .endOf('year')
                            .toDate()
                            .valueOf()
                    ),
                };
            }

            this.value = newPeriod;
        }
    }

    registerOnChange(fn: (value: any) => void) {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    writeValue(value: any) {
        if (typeof value === 'string') {
            value = momentConstructor(value).toDate();
        }
        this.value = value;
    }

    ngOnInit(): void {
        this._buildCalendar();
    }

    ngAfterContentInit(): void {
        this._init = true;
        this._refreshSelection();
    }

    ngOnDestroy(): void {
        // this._form.deregister(this.ionicFormInput);
    }

    private _onChangeCallback: (_: any) => void = (_: any) => {};
    private _onTouchedCallback: () => void = () => {};

    private _getMonthName(date: Date): string {
        return momentConstructor(date).format('MMM');
    }

    private _setViewDate(date: Date): void {
        this._viewDate = date;
        this._viewMoment = momentConstructor(date);
    }

    private _buildCalendar(): void {
        if (this._viewMode === 'month') {
            this._buildMonthView();
        } else if (this._viewMode === 'year') {
            this._buildYearView();
        } else if (this._viewMode === 'decade') {
            this._buildDecadeView();
        }
    }

    private _buildDecadeView(): void {
        const curYear: number = this._viewDate.getFullYear();
        const firstYear = curYear - (curYear % 10) + 1;
        const lastYear = firstYear + 11;

        this._viewHeader = `${firstYear} - ${lastYear}`;

        const curDate: moment.Moment = momentConstructor(this.viewDate)
            .startOf('year')
            .year(firstYear);

        const rows: IonCalendarEntry[][] = [];
        for (let i = 0; i < 4; i++) {
            const row: IonCalendarEntry[] = [];
            for (let j = 0; j < 3; j++) {
                const date = new Date(curDate.toDate().valueOf());
                const newEntry = new IonCalendarEntry({
                    type: 'year',
                    date: date,
                    selected: 'none',
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate.add(1, 'y');
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    }

    private _buildYearView(): void {
        this._viewHeader = `${this._viewDate.getFullYear()}`;

        const curDate: moment.Moment = momentConstructor(this.viewDate).startOf(
            'year'
        );

        const rows: IonCalendarEntry[][] = [];
        for (let i = 0; i < 4; i++) {
            const row: IonCalendarEntry[] = [];
            for (let j = 0; j < 3; j++) {
                const date = new Date(curDate.toDate().valueOf());
                const newEntry = new IonCalendarEntry({
                    type: 'month',
                    date: date,
                    selected: 'none',
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate.add(1, 'M');
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    }

    private _buildMonthView(): void {
        this._viewHeader = momentConstructor(this._viewDate).format('MMM YYYY');

        this._buildMonthViewWeekDays();

        const viewStartDate: moment.Moment = momentConstructor(this.viewDate)
            .startOf('month')
            .startOf('week');
        const viewEndDate: moment.Moment = momentConstructor(this.viewDate)
            .endOf('month')
            .endOf('week');

        const rows: IonCalendarEntry[][] = [];
        const todayDate = momentConstructor();
        const curDate = momentConstructor(viewStartDate);
        const minDate =
            this.minDate == null ? null : momentConstructor(this.minDate);
        const maxDate =
            this.maxDate == null ? null : momentConstructor(this.maxDate);
        while (curDate < viewEndDate) {
            const row: IonCalendarEntry[] = [];
            for (let i = 0; i < 7; i++) {
                const disabled =
                    (minDate != null && curDate.isBefore(minDate)) ||
                    (maxDate != null && curDate.isAfter(maxDate));
                const date = new Date(curDate.toDate().valueOf());
                const newEntry: IonCalendarEntry = new IonCalendarEntry({
                    type: 'day',
                    date: date,
                    selected: 'none',
                    highlight:
                        todayDate.format('YYYY-MM-DD') ===
                        curDate.format('YYYY-MM-DD'),
                    disabled: disabled,
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate.add(1, 'd');
            }
            rows.push(row);
        }

        this._calendarRows = rows;
    }

    private _buildMonthViewWeekDays(): void {
        const curMoment = momentConstructor().startOf('week');
        const weekDayNames: string[] = [];
        for (let i = 0; i < 7; i++) {
            weekDayNames.push(curMoment.format('ddd'));
            curMoment.add(1, 'd');
        }
        this._weekDays = weekDayNames;
    }

    private _periodOrder(entryType: IonCalendarPeriodType): number {
        return ['day', 'week', 'month', 'year'].indexOf(entryType);
    }

    private _isEntrySelected(
        entry: IonCalendarEntry
    ): IonCalendarEntrySelectedState {
        if (this._selectionType === 'multiple') {
            const index = this.isInSelectedValues(entry.date);

            if (index != null) {
                return 'full';
            }
        }

        if (this._selectionType === 'single') {
            if (
                this._selectedPeriod != null &&
                this._selectedPeriod.type != null &&
                this._selectedPeriod.startDate != null &&
                this._selectedPeriod.endDate != null
            ) {
                const selectionStart: moment.Moment = momentConstructor(
                    this._selectedPeriod.startDate
                ).startOf('day');
                const selectionEnd: moment.Moment = momentConstructor(
                    this._selectedPeriod.endDate
                ).endOf('day');
                const selectionPeriodOrder: number = this._periodOrder(
                    this._selectedPeriod.type
                );

                const entryPeriodOrder: number = this._periodOrder(entry.type);
                const entryRange: {
                    start: moment.Moment;
                    end: moment.Moment;
                } = entry.getRange();

                if (
                    entryPeriodOrder <= selectionPeriodOrder &&
                    entryRange.start.isBetween(
                        selectionStart,
                        selectionEnd,
                        null,
                        '[]'
                    ) &&
                    entryRange.end.isBetween(
                        selectionStart,
                        selectionEnd,
                        null,
                        '[]'
                    )
                ) {
                    return 'full';
                } else if (
                    entryPeriodOrder > selectionPeriodOrder &&
                    selectionStart.isBetween(
                        entryRange.start,
                        entryRange.end,
                        null,
                        '[]'
                    ) &&
                    selectionEnd.isBetween(
                        entryRange.start,
                        entryRange.end,
                        null,
                        '[]'
                    )
                ) {
                    return 'partial';
                }
            }
        }

        const isInPreselectedValues = this.isInPreselecteValues(entry.date);

        if (isInPreselectedValues != null) {
            return 'partial';
        }

        return 'none';
    }

    private _refreshSelection(): void {
        for (const row of this._calendarRows) {
            for (const entry of row) {
                entry.selected = this._isEntrySelected(entry);
            }
        }
    }

    private _canSelectEntry(entry: IonCalendarEntry): boolean {
        if (
            ['day', 'week'].indexOf(this._selectionMode) >= 0 &&
            entry.type !== 'day'
        ) {
            return false;
        }
        if (this._selectionMode === 'month' && entry.type === 'year') {
            return false;
        }
        return true;
    }

    private _nextViewMode(entry: IonCalendarEntry): void {
        if (this._viewMode === 'decade') {
            this._viewMode = 'year';
        } else if (this._viewMode === 'year') {
            this._viewMode = 'month';
        } else if (this._viewMode === 'month') {
            return;
        }
        this._viewDate = entry.date;
        this._buildCalendar();
    }
}
