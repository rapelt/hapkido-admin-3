import { Validators } from '@angular/forms';
import { emptyValidator } from '../../common/validators/empty.validator';

export function getFormData() {
    return {
        title: {
            id: 'title',
            label: 'Title',
            validators: [Validators.maxLength(100), emptyValidator()],
            validationMessages: [
                { type: 'required', message: 'Title is required' },
                {
                    type: 'maxlength',
                    message: 'Title must be 100 characters or less',
                },
                { type: 'empty', message: 'Title is required' },
            ],
        },
        description: {
            id: 'description',
            label: 'Description',
            validators: [Validators.maxLength(500)],
            validationMessages: [
                {
                    type: 'maxlength',
                    message: 'Description must be 500 characters or less',
                },
            ],
        },
        grade: {
            id: 'grade',
            label: 'Grade',
            validators: [Validators.required],
            validationMessages: [
                { type: 'required', message: 'Grade is required' },
            ],
        },
        tags: {
            id: 'tags',
            label: 'Tags',
            validators: [],
            validationMessages: [],
        },
    };
}
