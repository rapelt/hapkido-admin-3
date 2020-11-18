import { Component, OnInit } from '@angular/core';
import { SearchablePageComponent } from '../../../common/Searchable-Page.component';
import { TechniqueModel } from '../../../common/models/technique';
import { MediaModel } from '../../../common/models/media';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { techniqueSelector } from '../../technique-group/view-technique/view-technique.selector';
import { AppState } from '../../../app-store/state/app.reducers';
import { Store } from '@ngrx/store';
import { MediaHelperService } from '../../../common/helper/media-helper.service';

@Component({
    selector: 'app-view-media',
    templateUrl: './view-media.component.html',
    styleUrls: [
        './view-media.component.scss',
        '../../../common/components/video/video-style.scss',
    ],
})
export class ViewMediaComponent extends SearchablePageComponent
    implements OnInit {
    loaded = false;
    breadcrumbs = [];
    techniqueId;
    mediaId;
    technique;
    media;

    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<AppState>,
        private mediaHelper: MediaHelperService
    ) {
        super();
    }

    ngOnInit() {
        this.subscriber = this.activatedRoute.paramMap.subscribe(
            (params: ParamMap) => {
                this.techniqueId = parseInt(params.get('techniqueId'), 10);
                this.mediaId = parseInt(params.get('mediaId'), 10);
                this.updateTechnique();
            }
        );
    }

    updateTechnique() {
        this.technique = this.store.select(techniqueSelector(this.techniqueId));

        this.subscriber = this.technique.subscribe(technique => {
            if (technique) {
                this.getMedia(technique);
                this.setBreadcrumbs(technique, this.media);
            }
        });
    }

    getMedia(technique: TechniqueModel) {
        this.media = technique.media.find(m => m.id === this.mediaId);
        this.loaded = true;
    }

    isVideo(mediaType) {
        return this.mediaHelper.isVideo(mediaType);
    }

    isImage(mediaType) {
        return this.mediaHelper.isPhoto(mediaType);
    }

    isDocument(mediaType) {
        return this.mediaHelper.isDocument(mediaType);
    }

    closeSidePanel() {}

    getVideoOptions() {
        return {
            autoplay: false,
            controls: true,
            sources: [{ src: this.getVideoUrl(), type: 'video/mp4' }],
            poster: this.getThumbnailUrl(),
        };
    }

    getImageOptions() {
        return {
            src: this.media.url,
            altText: this.media.description,
            size: {
                maxWidth: window.innerWidth - 40,
                maxHeight: window.innerHeight - 56 - 40,
            },
        };
    }

    getDocumentOptions() {
        return {
            src: this.media.url,
            altText: this.media.description,
        };
    }

    getThumbnailUrl() {
        return this.mediaHelper.getVideoThumbnail(this.media);
    }

    getVideoUrl() {
        return (
            this.media.url +
            'MP4/' +
            this.media.file_name +
            '.' +
            this.media.file_type
        );
    }

    setBreadcrumbs(technique: TechniqueModel, media: MediaModel) {
        this.breadcrumbs = [
            {
                name: 'Techniques',
                navigate: '/technique/list',
            },
            {
                name: technique.techniqueSet.name,
                navigate: '/technique/list/' + technique.techniqueSet.id,
            },
            {
                name: technique.title,
                navigate: '/technique/view/' + this.techniqueId,
            },
            {
                name: media.original_file_name,
                navigate:
                    '/technique/view/' +
                    this.techniqueId +
                    '/media/' +
                    this.mediaId,
            },
        ];
    }
}
