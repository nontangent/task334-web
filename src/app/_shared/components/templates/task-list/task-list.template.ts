import { Component, OnInit, Input, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as models from '@models';
import { CdkDrag, CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';

enum Mode {
  WIP = 'wip',
  DONE = 'done',
  LEFT = 'left'
}

@Component({
  selector: 'templates-task-list',
  templateUrl: './task-list.template.html',
  styleUrls: ['./task-list.template.scss']
})
export class TaskListTemplate implements OnInit, AfterViewInit {

  Mode = Mode;

  @Input()
  thresholdRate: number = 1 / 7;

  @Input()
  tasks: models.Task[] = []

  @Output()
  onTaskStatusChange = new EventEmitter();

  width: number = 0;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.width = this.el.nativeElement.clientWidth;
  }

  dragStarted(event: CdkDragStart) {
    event.source.element.nativeElement.setAttribute('dragging', '');
  }

  dragMoved({distance, source}: CdkDragMove) {
    switch(this.getSourceMode(source)) {
      case Mode.WIP: {
        this.setSourcePropertyX(source, 
          Math.sign(distance.x) == 1
          ? Math.min(distance.x, this.width / 2) - 16
          : Math.max(distance.x, -1 * this.width / 2) + 16
        ); break;
      }
      case Mode.LEFT: {
        this.setSourcePropertyX(source, Math.max(0, distance.x) - this.width / 2 + 16); 
        break;
      }
      case Mode.DONE: {
        this.setSourcePropertyX(source, Math.min(0, distance.x) + this.width / 2 - 16);
        break;
      }
    }
  }

  dragEnded(event: CdkDragEnd, task: models.Task) {
    const {source, distance} = event;

    switch(this.getSourceMode(source)) {
      case Mode.WIP: {
        if (distance.x < -1 * this.width * this.thresholdRate) {
          source.element.nativeElement.setAttribute('mode', Mode.LEFT);
          this.onTaskStatusChange.emit([task, models.TaskStatus.LEFT]);
        } else if (distance.x > this.width * this.thresholdRate) {
          source.element.nativeElement.setAttribute('mode', Mode.DONE);
          this.onTaskStatusChange.emit([task, models.TaskStatus.DONE]);
        } break;
      }
      case Mode.LEFT: {
        if (distance.x > this.width * this.thresholdRate) {
          source.element.nativeElement.setAttribute('mode', Mode.WIP);
          this.onTaskStatusChange.emit([task, models.TaskStatus.WIP]);
        } break;
      }
      case Mode.DONE: {
        if (distance.x < -1 * this.width * this.thresholdRate) {
          source.element.nativeElement.setAttribute('mode', Mode.WIP);
          this.onTaskStatusChange.emit([task, models.TaskStatus.WIP]);
        } break;
      }
    }

    event.source.element.nativeElement.removeAttribute('dragging');
    source.reset();
  }

  setSourcePropertyX(source: CdkDrag, x: number) {
    source.element.nativeElement.style.setProperty(
      'transform', 
      `translate3d(${ x }px, 0px, 0px)`
    );
  }

  getSourceMode(source: CdkDrag) {
    return source.element.nativeElement.getAttribute('mode');
  }

}
