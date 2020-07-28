import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Adoptable } from 'src/app/models/adoptables';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { Title, Meta } from '@angular/platform-browser';
import { DbMessageService } from 'src/app/shared/services/db-message.service';

@Component({
  selector: 'app-admin-new',
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.scss']
})
export class AdminNewComponent implements OnInit {

  public newDogForm: FormGroup;
  public idVerified: boolean = false;

  //dogs var which will contain an array of documents from the database
  //
  public dogs: Adoptable;
  public traits: any[] = [];
  //title and meta tag vars
  //
  private title: string = "Pitbull Paradise | Viewing";
  private metaDesc: string = "";
  private robots: string = "NOINDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"

  constructor(
    private adoptablesService: AdoptableService,
    private titleService: Title,
    private metaService: Meta,
    private dbMessageService: DbMessageService
  ) { }

  ngOnInit() {
    //update dog form
    //
    this.newDogForm = new FormGroup({
      'dogData': new FormGroup({
        'id': new FormControl(null, [Validators.required]),
        'age': new FormControl(null, [Validators.required]),
        'name': new FormControl(null, [Validators.required]),
        'type': new FormControl(null, [Validators.required]),
        'breed': new FormControl(null, [Validators.required]),
        'birthdate': new FormControl(null, [Validators.required]),
        'gender': new FormControl(null, [Validators.required]),
        'traits': new FormControl(null),
        'image': new FormControl(null, [Validators.required]),
        'description': new FormControl(null, [Validators.required]),
        'adoptionFee': new FormControl(null, [Validators.required]),
        'isFeatured': new FormControl(null, [Validators.required]),
        'hasMedicalNeeds': new FormControl(null, [Validators.required]),
        'healthDesc': new FormControl(null),
        'intakeDate': new FormControl(null, [Validators.required]),
        'notes': new FormControl(null),
        'newTrait': new FormControl(null)
      })
    });
  }

  update() {
    //set title and update meta tags
    //
    this.titleService.setTitle(this.title + ' ' + this.dogs.name + ' ' + this.dogs.id);
    this.metaService.updateTag({ name: 'description', content: this.dogs.name + ' ' + this.dogs.description });
    this.metaService.updateTag({ name: 'robots', content: this.robots });
    this.metaService.updateTag({ name: 'author', content: this.author });
  }

  onRemoveTrait(index: number) {
    this.traits.splice(index, 1);
  }

  onAddTrait(value: string) {
    this.traits.push(value);
  }

  checkId() {
    const id = this.newDogForm.get('dogData.id').value;
    if (id && id.length == 16) {
      this.adoptablesService.getDogsById(id)
        .then(res => {
          if (res) {
            //dog with given id exists
            //
            this.idVerified = false;
          } else {
            //no dog with given id exists
            //
            this.idVerified = true;
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      this.idVerified = false;
    }
  }

  //generate a new id
  //
  generateId() {
    let id = "";
    let possible = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
    let length = 16;

    for (let i = 0; i < length; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    //set id
    //
    this.newDogForm.get('dogData.id').setValue(id);
    this.checkId();
  }

  onSubmit() {
    let data = {
      id: this.newDogForm.get('dogData.id').value,
      age: this.newDogForm.get('dogData.age').value,
      name: this.newDogForm.get('dogData.name').value,
      type: this.newDogForm.get('dogData.type').value,
      breed: this.newDogForm.get('dogData.breed').value,
      birthdate: new Date(this.newDogForm.get('dogData.birthdate').value).getTime(),
      gender: this.newDogForm.get('dogData.gender').value,
      traits: this.traits,
      image: this.newDogForm.get('dogData.image').value,
      description: this.newDogForm.get('dogData.description').value,
      adoptionFee: this.newDogForm.get('dogData.adoptionFee').value,
      isFeatured: this.newDogForm.get('dogData.isFeatured').value,
      hasMedicalNeeds: this.newDogForm.get('dogData.hasMedicalNeeds').value,
      healthDesc: this.newDogForm.get('dogData.healthDesc').value,
      intakeDate: new Date(this.newDogForm.get('dogData.intakeDate').value).getTime(),
      notes: this.newDogForm.get('dogData.notes').value
    };
    
    this.adoptablesService.createDog(data)
      .then(res => {
        console.log(res.message, res.type);
        this.dbMessageService.setMessage(res.message, res.type);
      });
  }

}
