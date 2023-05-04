import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';

import { Regional } from './regional';

import { RegionalService } from './regional.service';

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
})
export class RegionalComponent implements OnInit {

  regionales:Regional[] = [];

  constructor(
    private regionalService:RegionalService,
    private chdr:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.listadoRegional();
  }

  listadoRegional(){
    this.regionalService.getRegionales().subscribe(resul => {
      this.regionales = resul;
      this.chdr.detectChanges()
    })
  }

}
