import { AfterViewInit, Component, OnInit } from '@angular/core';
import Handsontable from 'handsontable';
import { GraphDataService } from './graph-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyValidator } from '../common/validators/empty.validator';
import * as moment from 'moment';

@Component({
    selector: 'app-graphs',
    templateUrl: './graphs.page.html',
    styleUrls: ['./graphs.page.scss'],
})
export class GraphsPage implements OnInit {
    graphData$: any;

    hot: Handsontable;
    exportPlugin;

    loaded = true;
    graphGenerated = false;

    graphForm: FormGroup;

    saveAttempted = false;

    validation_messages = {
        startDate: [{ type: 'required', message: 'Start date is required' }],
        endDate: [{ type: 'required', message: 'End date is required' }],
    };

    constructor(
        private graphDataService: GraphDataService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.graphForm = this.fb.group({
            startDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
            endDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
        });
    }

    setGraph(graphData) {
        const container = document.getElementById('example');
        this.hot = new Handsontable(container, {
            data: graphData.dataset,
            rowHeaders: true,
            colHeaders: graphData.colHeaders,
            filters: true,
            dropdownMenu: true,
            colWidths: [60, 60, 30],
            rowHeights: 40,
            disableVisualSelection: true,
            width: '100%',
            height: '80%',
            fixedColumnsLeft: 2,
            fixedRowsTop: 1,
            fixedRowsBottom: 3,
            licenseKey: 'non-commercial-and-evaluation',
        });

        this.exportPlugin = this.hot.getPlugin('exportFile');

        const autoColumnSize = this.hot.getPlugin('autoColumnSize');
        const autoRowSize = this.hot.getPlugin('autoRowSize');
        autoColumnSize.recalculateAllColumnsWidth();
        autoRowSize.calculateAllRowsHeight();

        this.loaded = true;
        this.graphGenerated = true;
    }

    downloadFile() {
        console.log('click');
        this.exportPlugin.downloadFile('csv', {
            filename: 'MyFile',
            columnHeaders: true,
        });
    }

    save() {
        this.loaded = false;
        const values = this.graphForm.value;

        this.graphData$ = this.graphDataService
            .getGraphData(values.startDate, values.endDate)
            .subscribe(graphData => {
                this.setGraph(graphData);
            });
    }

    restart() {
        this.graphGenerated = false;
        this.hot.destroy();
    }
}
