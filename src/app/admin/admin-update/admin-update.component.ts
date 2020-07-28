import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Adoptable } from 'src/app/models/adoptables';
import { ActivatedRoute } from '@angular/router';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { Title, Meta } from '@angular/platform-browser';
import { DbMessageService } from 'src/app/shared/services/db-message.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.scss']
})
export class AdminUpdateComponent implements OnInit {
  public updateDogForm: FormGroup;

  //dogs var which will contain an array of documents from the database
  //
  public dogs: Adoptable;
  public traits: any[] = [];
  public id: string;
  //title and meta tag vars
  //
  private title: string = "Pitbull Paradise | Viewing";
  private metaDesc: string = "";
  private robots: string = "NOINDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"

  constructor(
    private route: ActivatedRoute, 
    private adoptablesService: AdoptableService, 
    private titleService: Title, 
    private metaService: Meta,
    private dbMessageService: DbMessageService
    ) {
    //object params contains multiple parameters seperated by dash
    //
    let params = this.route.snapshot.paramMap.get('params').split('-');
    //get the second paramter which is the id of the dog
    //
    this.id = params[1];
  }

  ngOnInit() {
    //getdogs
    //
    this.getDogs();
    //update dog form
    //
    this.updateDogForm = new FormGroup({
      'updateData': new FormGroup({
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

  getDogs() {
    this.adoptablesService.getDogsById(this.id)
      .then(res => {
        this.dogs = res;
        this.update();
      })
      .catch(err => console.log(err))
  }

  update() {
    //set title and update meta tags
    //
    this.titleService.setTitle(this.title + ' ' + this.dogs.name + ' ' + this.dogs.id);
    this.metaService.updateTag({ name: 'description', content: this.dogs.name + ' ' + this.dogs.description });
    this.metaService.updateTag({ name: 'robots', content: this.robots });
    this.metaService.updateTag({ name: 'author', content: this.author });
    //
    //
    this.updateDogForm.get('updateData.id').setValue(this.dogs.id);
    this.updateDogForm.get('updateData.age').setValue(this.dogs.age);
    this.updateDogForm.get('updateData.name').setValue(this.dogs.name);
    this.updateDogForm.get('updateData.type').setValue(this.dogs.type.toLowerCase());
    this.updateDogForm.get('updateData.breed').setValue(this.dogs.breed);
    this.updateDogForm.get('updateData.birthdate').setValue(new Date(this.dogs.birthdate).toLocaleDateString());
    this.updateDogForm.get('updateData.gender').setValue(this.dogs.gender.toLowerCase());
    this.updateDogForm.get('updateData.image').setValue(this.dogs.image);
    this.updateDogForm.get('updateData.description').setValue(this.dogs.description);
    this.updateDogForm.get('updateData.adoptionFee').setValue(this.dogs.adoptionFee);
    this.updateDogForm.get('updateData.isFeatured').setValue(this.dogs.isFeatured);
    this.updateDogForm.get('updateData.hasMedicalNeeds').setValue(this.dogs.hasMedicalNeeds);
    this.updateDogForm.get('updateData.healthDesc').setValue(this.dogs.healthDesc);
    this.updateDogForm.get('updateData.intakeDate').setValue(new Date(this.dogs.intakeDate).toLocaleDateString());
    this.updateDogForm.get('updateData.notes').setValue(this.dogs.notes);
    //update traits array
    //
    for (const trait in this.dogs.traits) {
      this.traits.push(this.dogs.traits[trait]);
    }
  }

  onRemoveTrait(index: number) {
    this.traits.splice(index, 1);
  }
  
  onAddTrait(value: string) {
    this.traits.push(value);
  }

  onSubmit() {
    let data = {
      id: this.updateDogForm.get('updateData.id').value,
      age: this.updateDogForm.get('updateData.age').value,
      name: this.updateDogForm.get('updateData.name').value,
      type: this.updateDogForm.get('updateData.type').value,
      breed: this.updateDogForm.get('updateData.breed').value,
      birthdate: this.updateDogForm.get('updateData.birthdate').value,
      gender: this.updateDogForm.get('updateData.gender').value,
      traits: this.traits,
      image: this.updateDogForm.get('updateData.image').value,
      description: this.updateDogForm.get('updateData.description').value,
      adoptionFee: this.updateDogForm.get('updateData.adoptionFee').value,
      isFeatured: this.updateDogForm.get('updateData.isFeatured').value,
      hasMedicalNeeds: this.updateDogForm.get('updateData.hasMedicalNeeds').value,
      healthDesc: this.updateDogForm.get('updateData.healthDesc').value,
      intakeDate: new Date(this.updateDogForm.get('updateData.intakeDate').value).getTime(),
      notes: this.updateDogForm.get('updateData.notes').value
    };
    this.adoptablesService.updateDogByID(data)
    .then(res => {
      this.dbMessageService.setMessage(res.message,res.type);
    });
  }
}
