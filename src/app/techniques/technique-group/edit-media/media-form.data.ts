import { Validators } from '@angular/forms';
import { emptyValidator } from '../../../common/validators/empty.validator';

export function getFormData() {
    return {
        original_file_name: {
            id: 'original_file_name',
            label: 'File name',
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
        publishedStatus: {
            id: 'publishedStatus',
            label: 'Status',
            validators: [Validators.required],
            validationMessages: [
                { type: 'required', message: 'Published Status is required' },
            ],
            options: [
                { name: 'Published', value: 'Published' },
                { name: 'Draft', value: 'Draft' },
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
