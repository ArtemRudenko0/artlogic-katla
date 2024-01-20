import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { HiveSectionService } from '../services/hive-section.service';
import { HiveSection } from '../models/hive-section';
import { HiveListItem } from '../models/hive-list-item';
import { HiveService } from '../services/hive.service';
@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  section = new HiveSection(0, "", "", 0, false, "");
  existed = false;
  storeHiveId: number;
  hives: HiveListItem[];
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService,
    private hiveService: HiveService ) 
  { }
 
  ngOnInit() {
 this.hiveService.getHives().subscribe(c => this.hives = c);
    this.route.params.subscribe(params => {
      const hiveId = params['id'];
      if (hiveId) {
        this.storeHiveId = +hiveId; 
      } else {
        this.storeHiveId = this.section.storeHiveId;
      }

      if (params['sectionId'] === undefined) {
        this.section.storeHiveId = this.storeHiveId;
        return;
      }

      this.hiveSectionService.getHiveSection(params['sectionId']).subscribe(c => {
        this.section = c;
        this.storeHiveId = c.storeHiveId;
      });
      this.existed = true;
    });
  }
  navigateToHiveSections() {
    this.router.navigate([`/hive/${this.storeHiveId}/sections`]);
  }
  onCancel() {
    this.navigateToHiveSections();
  }
  onSubmit() {
    if (this.existed) {
      this.hiveSectionService.updateHiveSection(this.section).subscribe(p => this.navigateToHiveSections());
    } else {
      this.section.storeHiveId = this.storeHiveId;
      this.hiveSectionService.addHiveSection(this.section).subscribe(h => this.navigateToHiveSections());
    }
  }
  onDelete() {
    this.hiveSectionService.setHiveSectionStatus(this.section.id, true).subscribe(c => this.section.isDeleted = true);
  }

  onUndelete() {
    this.hiveSectionService.setHiveSectionStatus(this.section.id, false).subscribe(c => this.section.isDeleted = false);
  }

  onPurge() {
    this.hiveSectionService.deleteHiveSection(this.section.id).subscribe(c => this.navigateToHiveSections());
  }
}
