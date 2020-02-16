import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { MenuItem } from 'primeng/api';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PolicyComponent implements OnInit {
  items: MenuItem[];
  @ViewChild(SignaturePad,{read:false,static:false}) signaturePad: SignaturePad;
  fileToUpload: File = null;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 345,
    'canvasHeight': 100
  };
  constructor(private clientService: ClientsService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'פרטים אישיים'
      },
      {
        label: 'הבית שלך'
      },
      {
        label: 'מה אתה מחפש'
      },
      {
        label: 'תקנון האתר'
      }
    ];
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  saveSignature(){
    if (this.signaturePad.isEmpty()) {
      
      var alert;
      alert = {
        title: 'לא נימצאה חתימה',
        icon: "success",
      };
    }
      
    else
      Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
    Swal.fire(alert,"הרשמה בוצעה בהצלחה", "success");

    this.clientService.uploadSignature('123456789', this.signaturePad.toDataURL('image/png')).subscribe(success => {
      debugger;
    },
    error => {
      debugger;
    });
    
  }
}