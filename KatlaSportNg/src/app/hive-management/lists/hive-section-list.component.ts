import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionListItem } from '../models/hive-section-list-item';
import { HiveService } from '../services/hive.service';
import { HiveSectionService } from '../services/hive-section.service';

@Component({
  selector: 'app-hive-section-list',
  templateUrl: './hive-section-list.component.html',
  styleUrls: ['./hive-section-list.component.css']
})
export class HiveSectionListComponent implements OnInit {

  hiveSectionId: number;
  hiveSections: Array<HiveSectionListItem>;
  hiveId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveService: HiveService,
    private hiveSectionService: HiveSectionService
  ) { }

  onDelete(hiveSectionId: number) {
    var hiveSection = this.hiveSections.find(h => h.id == hiveSectionId);
    this.hiveSectionService.setHiveSectionStatus(hiveSection.id, true).subscribe(s => hiveSection.isDeleted = true);
  }

  onRestore(hiveSectionId: number) {
    var hiveSection = this.hiveSections.find(h => h.id == hiveSectionId);
    this.hiveSectionService.setHiveSectionStatus(hiveSection.id, false).subscribe(s => hiveSection.isDeleted = false);
  }
  ngOnInit() {
    this.route.params.subscribe(p => {
      this.hiveSectionId = p['id'];
      this.hiveService.getHiveSections(this.hiveSectionId).subscribe(s => this.hiveSections = s);
    })
  }
}
