import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Directive, Input, OnDestroy, OnInit } from '@angular/core';

@Directive()
export abstract class FormElementDirective
    implements ControlValueAccessor, OnInit, OnDestroy {
    public formElement;
    public formData;

    @Input()
    saveAttempted = false;

    public onChange: (name: any) => void;
    private onTouched: () => void;

    ngOnInit(): void {}

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(obj: any): void {
        obj ? this.formElement.setValue(obj) : this.formElement.setValue('');
    }

    doInput() {
        this.onChange(this.formElement.value);
    }

    doBlur() {
        this.onTouched();
    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.formElement.disable();
        } else {
            this.formElement.enable();
        }
    }

    validate(c: FormControl) {
        return this.formElement.valid ? null : { passwords: { valid: false } };
    }

    ngOnDestroy(): void {}
}
