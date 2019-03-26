import { Component, Input, OnInit } from '@angular/core';
import { GradeHelper } from '../../helper/grade/grade';

@Component({
  selector: 'app-grade-badge',
  templateUrl: './grade-badge.component.html',
  styleUrls: ['./grade-badge.component.scss']
})
export class GradeBadgeComponent implements OnInit {

  @Input()
  grade: number;

  constructor(public gradeHelper: GradeHelper) { }

  ngOnInit() {
  }

}
