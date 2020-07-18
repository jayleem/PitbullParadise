import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Adoptable } from 'src/app/models/adoptables';

@Component({
  selector: 'app-dog-adoption-form',
  templateUrl: './dog-adoption-form.component.html',
  styleUrls: ['./dog-adoption-form.component.scss']
})
export class DogAdoptionFormComponent implements OnInit {

  date = Date.now();
  public dogAdoptionForm: FormGroup;

  //dogs var which will contain an array of documents from the database
  //
  public dogs: Adoptable;
  public id: string;
  //title and meta tag vars
  //
  private title: string = "Pitbull Paradise | Adoption Form";
  private metaDesc: string = "Pitbull Paradise | Adoption Form";
  private robots: string = "NOINDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"

  constructor(private route: ActivatedRoute, private adoptablesService: AdoptableService, private titleService: Title, private metaService: Meta) {
    //object params contains multiple parameters seperated by dash
    //
    if (this.route.snapshot.paramMap.get('params')) {
      let params = this.route.snapshot.paramMap.get('params').split('-');
      this.id = params[1];
    } else {
      //to-do
    }
  }

  ngOnInit() {
    //get dogs
    //
    this.getDogs();
    //set title and update meta tags
    //
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({ name: 'description', content: this.metaDesc });
    this.metaService.updateTag({ name: 'robots', content: this.robots });
    this.metaService.updateTag({ name: 'author', content: this.author });
    this.dogAdoptionForm = new FormGroup({
      'adoptionData': new FormGroup({
        'dateOfApp': new FormControl({value: null, disabled: true }),
        'timeOfApp': new FormControl({value: null, disabled: true }),
        'dogsName': new FormControl({value: null, disabled: true }),
        'dogsID': new FormControl({value: null, disabled: true }),
        'adoptionFee': new FormControl({value: null, disabled: true }),
        'firstName': new FormControl(null, [Validators.required]),
        'middleInitial': new FormControl(null, [Validators.required]),
        'lastName': new FormControl(null, [Validators.required]),
        'currAddr': new FormControl(null, [Validators.required]),
        'livedAtCurrAddrNum': new FormControl(null, [Validators.required]),
        'prevAddr': new FormControl(null, [Validators.required]),
        'dayPhoneNum': new FormControl(null, [Validators.required]),
        'dayPhoneBestTime': new FormControl(null, [Validators.required]),
        'eveningPhoneNum': new FormControl(null, [Validators.required]),
        'eveningPhoneBestTime': new FormControl(null, [Validators.required]),
        'emailAddr': new FormControl(null, [Validators.required]),
        'occupation': new FormControl(null, [Validators.required]),
        'rentOrOwnC1': new FormControl(null),
        'rentOrOwnC2': new FormControl(null),
        'typeOfHomeC1': new FormControl(null),
        'typeOfHomeC2': new FormControl(null),
        'typeOfHomeC3': new FormControl(null),
        'typeOfHomeC4': new FormControl(null),
        'hasYardC1': new FormControl(null),
        'hasYardC2': new FormControl(null),
        'landlordContactInfo': new FormControl(null),
        'whyAdoptC1': new FormControl(null),
        'whyAdoptC2': new FormControl(null),
        'whyAdoptC3': new FormControl(null),
        'whyAdoptC4': new FormControl(null),
        'whyAdoptC5': new FormControl(null),
        'pitbullCharcsC1': new FormControl(null),
        'pitbullCharcsC2': new FormControl(null),
        'prevPitbullOwnerC1': new FormControl(null),
        'prevPitbullOwnerC2': new FormControl(null),
        'petHoursAlone': new FormControl(null, [Validators.required]),
        'behaviourRes': new FormControl(null, [Validators.required]),
        'numPets': new FormControl(null, [Validators.required]),
        'petAgeList': new FormControl(null),
        'numChildren': new FormControl(null, [Validators.required]),
        'childrenAgeList': new FormControl(null),
        'numAdults': new FormControl(null, [Validators.required]),
        'adultsAgeList': new FormControl(null),
        'signature': new FormControl(null, [Validators.required]),
        'reviewer': new FormControl(null),
        'statusC1': new FormControl(null),
        'statusC2': new FormControl(null),
        'rejRes': new FormControl(null)
      })
    });
  }

  getDogs() {
    this.adoptablesService.getDogsById(this.id)
      .then(res => {
        this.dogs = res;
        if (this.dogs) {
          //update the reactive form with data from the selected dog
          //
          let adoptionFee = (Number(this.dogs.adoptionFee)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
          let date = new Date(this.date).toLocaleDateString();
          let time = new Date().toLocaleTimeString('en-US', { hour: "numeric", minute: "numeric" });
          this.dogAdoptionForm.get('adoptionData.dateOfApp').setValue(date);
          this.dogAdoptionForm.get('adoptionData.timeOfApp').setValue(time);
          this.dogAdoptionForm.get('adoptionData.dogsName').setValue(this.dogs.name);
          this.dogAdoptionForm.get('adoptionData.dogsID').setValue(this.dogs.id);
          this.dogAdoptionForm.get('adoptionData.adoptionFee').setValue(adoptionFee);
        }
      })
      .catch(err => console.log(err))
  }

  onSubmit() {
    const data = {
      date: this.dogAdoptionForm.get('adoptionData.dateOfApp').value,
      time: this.dogAdoptionForm.get('adoptionData.timeOfApp').value,
      dogsName: this.dogAdoptionForm.get('adoptionData.dogsName').value,
      dogsId: this.dogAdoptionForm.get('adoptionData.dogsID').value,
      adoptionFee:  this.dogAdoptionForm.get('adoptionData.adoptionFee').value,
      firstName:  this.dogAdoptionForm.get('adoptionData.firstName').value,
      lastName:  this.dogAdoptionForm.get('adoptionData.lastName').value,
      currAddr:  this.dogAdoptionForm.get('adoptionData.currAddr').value,
      livedAtCurrAddrNum:  this.dogAdoptionForm.get('adoptionData.livedAtCurrAddrNum').value,
      prevAddr:  this.dogAdoptionForm.get('adoptionData.prevAddr').value,
      dayPhoneNum:  this.dogAdoptionForm.get('adoptionData.dayPhoneNum').value,
      dayPhoneBestTime:  this.dogAdoptionForm.get('adoptionData.dayPhoneBestTime').value,
      eveningPhoneNum:  this.dogAdoptionForm.get('adoptionData.eveningPhoneNum').value,
      eveningPhoneBestTime:  this.dogAdoptionForm.get('adoptionData.eveningPhoneBestTime').value,
      emailAddr:  this.dogAdoptionForm.get('adoptionData.emailAddr').value,
      occupation:  this.dogAdoptionForm.get('adoptionData.occupation').value,
      rentOrOwnC1:  this.dogAdoptionForm.get('adoptionData.rentOrOwnC1').value,
      rentOrOwnC2:  this.dogAdoptionForm.get('adoptionData.rentOrOwnC2').value,
      typeOfHomeC1:  this.dogAdoptionForm.get('adoptionData.typeOfHomeC1').value,
      typeOfHomeC2:  this.dogAdoptionForm.get('adoptionData.typeOfHomeC2').value,
      typeOfHomeC3:  this.dogAdoptionForm.get('adoptionData.typeOfHomeC3').value,
      typeOfHomeC4:  this.dogAdoptionForm.get('adoptionData.typeOfHomeC4').value,
      hasYardC1:  this.dogAdoptionForm.get('adoptionData.hasYardC1').value,
      hasYardC2:  this.dogAdoptionForm.get('adoptionData.hasYardC2').value,
      landlordContactInfo:  this.dogAdoptionForm.get('adoptionData.landlordContactInfo').value,
      whyAdoptC1:  this.dogAdoptionForm.get('adoptionData.whyAdoptC1').value,
      whyAdoptC2:  this.dogAdoptionForm.get('adoptionData.whyAdoptC2').value,
      whyAdoptC3:  this.dogAdoptionForm.get('adoptionData.whyAdoptC3').value,
      whyAdoptC4:  this.dogAdoptionForm.get('adoptionData.whyAdoptC4').value,
      whyAdoptC5:  this.dogAdoptionForm.get('adoptionData.whyAdoptC5').value,
      pitbullCharcsC1:  this.dogAdoptionForm.get('adoptionData.pitbullCharcsC1').value,
      pitbullCharcsC2:  this.dogAdoptionForm.get('adoptionData.pitbullCharcsC2').value,
      prevPitbullOwnerC1:  this.dogAdoptionForm.get('adoptionData.prevPitbullOwnerC1').value,
      prevPitbullOwnerC2:  this.dogAdoptionForm.get('adoptionData.prevPitbullOwnerC2').value,
      petHoursAlone:  this.dogAdoptionForm.get('adoptionData.petHoursAlone').value,
      behaviourRes:  this.dogAdoptionForm.get('adoptionData.behaviourRes').value,
      numPets:  this.dogAdoptionForm.get('adoptionData.numPets').value,
      petAgeList:  this.dogAdoptionForm.get('adoptionData.petAgeList').value,
      numChildren:  this.dogAdoptionForm.get('adoptionData.numChildren').value,
      childrenAgeList:  this.dogAdoptionForm.get('adoptionData.childrenAgeList').value,
      numAdults:  this.dogAdoptionForm.get('adoptionData.numAdults').value,
      adultsAgeList:  this.dogAdoptionForm.get('adoptionData.adultsAgeList').value,
      signature:  this.dogAdoptionForm.get('adoptionData.signature').value,
      reviewer:  this.dogAdoptionForm.get('adoptionData.reviewer').value,
      statusC1:  this.dogAdoptionForm.get('adoptionData.statusC1').value,
      statusC2:  this.dogAdoptionForm.get('adoptionData.statusC2').value,
      rejRes:  this.dogAdoptionForm.get('adoptionData.rejRes').value,
    }
    //send to backend to process as an email/pdf and send it
    //
    console.log(data);
  }

}
