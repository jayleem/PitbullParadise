import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
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
  //form errors
  //
  public formErrors: string = "";
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
        'dateOfApp': new FormControl({ value: null, disabled: true }),
        'timeOfApp': new FormControl({ value: null, disabled: true }),
        'dogsName': new FormControl({ value: null, disabled: true }),
        'dogsID': new FormControl({ value: null, disabled: true }),
        'adoptionFee': new FormControl({ value: null, disabled: true }),
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
        'rentOrOwnChoices': new FormGroup({
          'rentOrOwnC1': new FormControl(null),
          'rentOrOwnC2': new FormControl(null),
        }),
        'typeOfHomeChoices': new FormGroup({
          'typeOfHomeC1': new FormControl(null),
          'typeOfHomeC2': new FormControl(null),
          'typeOfHomeC3': new FormControl(null),
          'typeOfHomeC4': new FormControl(null),
        }),
        'hasYardChoices': new FormGroup({
          'hasYardC1': new FormControl(null),
          'hasYardC2': new FormControl(null),
        }),
        'landlordContactInfo': new FormControl(null),
        'vetFullName': new FormControl(null, [Validators.required]),
        'vetPhone': new FormControl(null, [Validators.required]),
        'vetAddr': new FormControl(null, [Validators.required]),
        'prevVetChoices': new FormGroup({
          'prevVetC1': new FormControl(null),
          'prevVetC2': new FormControl(null),
        }),
        'whyAdoptChoices': new FormGroup({
          'whyAdoptC1': new FormControl(null),
          'whyAdoptC2': new FormControl(null),
          'whyAdoptC3': new FormControl(null),
          'whyAdoptC4': new FormControl(null),
          'whyAdoptC5': new FormControl(null),
        }),
        'pitbullCharcsChoices': new FormGroup({
          'pitbullCharcsC1': new FormControl(null),
          'pitbullCharcsC2': new FormControl(null),
        }),
        'prevPitbullOwnerChoices': new FormGroup({
          'prevPitbullOwnerC1': new FormControl(null),
          'prevPitbullOwnerC2': new FormControl(null),
        }),
        'petHoursAlone': new FormControl(null, [Validators.required]),
        'behaviourRes': new FormControl(null, [Validators.required]),
        'numPets': new FormControl(null, [Validators.required]),
        'petAgeList': new FormControl(null),
        'numChildren': new FormControl(null, [Validators.required]),
        'childrenAgeList': new FormControl(null),
        'numAdults': new FormControl(null, [Validators.required]),
        'adultsAgeList': new FormControl(null),
        'allAgreeToAdoptionChoices': new FormGroup({
          'allAgreeToAdoptionC1': new FormControl(null),
          'allAgreeToAdoptionC2': new FormControl(null),
        }),
        'criminalChoices': new FormGroup({
          'criminalC1': new FormControl(null),
          'criminalC2': new FormControl(null),
        }),
        'signature': new FormControl(null, [Validators.required]),
        'reviewer': new FormControl({ value: null, disabled: true }),
        'statusChoices': new FormGroup({
          'statusC1': new FormControl({ value: null, disabled: true }),
          'statusC2': new FormControl({ value: null, disabled: true }),
        }),
        'rejRes': new FormControl({ value: null, disabled: true }),
      })
    });
  }

  private checkboxFGArr = [
    {
      'formGroup': 'rentOrOwnChoices',
      'multipleChoice': false
    },
    {
      'formGroup': 'typeOfHomeChoices',
      'multipleChoice': false
    },
    {
      'formGroup': 'hasYardChoices',
      'multipleChoice': false
    },
    {
      'formGroup': 'prevVetChoices',
      'multipleChoice': false
    },
    {
      'formGroup': 'whyAdoptChoices',
      'multipleChoice': true
    },
    {
      'formGroup': 'pitbullCharcsChoices',
      'multipleChoice': false
    },
    {
      'formGroup': 'prevPitbullOwnerChoices',
      'multipleChoice': false
    },
    {
      'formGroup': 'criminalChoices',
      'multipleChoice': false
    }
  ]

  checkboxValidation() {
    let results: boolean = false;
    for (const index in this.checkboxFGArr) {
      const currIndex = this.checkboxFGArr[index];
      const value = currIndex.formGroup;
      const multipleChoice = currIndex.multipleChoice;
      const validated = this.checkboxValidator(value, multipleChoice);
      console.log(validated);
      if (!validated) {
        this.formErrors = 'One or more required checkboxes were not selected.'
        results = false;
        break;
      } else {
        results = true;
      }
    }
    console.log(results);
    return results;
  }

  checkboxValidator(value: string, multipleChoice: boolean) {
    //vars used for validation
    //
    let count = 0;//keeps track of boxes which are checked
    let controlValues = [];//array of stored values
    const formGroup = (this.dogAdoptionForm.get(`adoptionData.${value}`) as FormArray);//the target formGroup
    const formGroupValues = formGroup.value;//the current values of all the form controls of the target formGroup
    //iterate over formGroupValues and push the value to the controlValues array
    //
    for (const value in formGroupValues) {
      controlValues.push(formGroupValues[value]);
    }
    //count the number of controls which are true 
    //
    for (const value in controlValues) {
      if (controlValues[value] == true) {
        count++;
      }
    }
    //validation logic
    //validation is passed if exactly one checkbox is checked
    //
    if (!multipleChoice && count == 1) {
      return true;
    }
    //validation is passed if at least one checkbox is checked
    //
    else if (multipleChoice && count >= 1) {
      return true;
    }
    //validation fails when no checkboxes are checked.
    //
    else {
      return false;
    }
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

  //submit form data
  onSubmit() {
    const data = {
      date: this.dogAdoptionForm.get('adoptionData.dateOfApp').value,
      time: this.dogAdoptionForm.get('adoptionData.timeOfApp').value,
      dogsName: this.dogAdoptionForm.get('adoptionData.dogsName').value,
      dogsId: this.dogAdoptionForm.get('adoptionData.dogsID').value,
      adoptionFee: this.dogAdoptionForm.get('adoptionData.adoptionFee').value,
      firstName: this.dogAdoptionForm.get('adoptionData.firstName').value,
      lastName: this.dogAdoptionForm.get('adoptionData.lastName').value,
      currAddr: this.dogAdoptionForm.get('adoptionData.currAddr').value,
      livedAtCurrAddrNum: this.dogAdoptionForm.get('adoptionData.livedAtCurrAddrNum').value,
      prevAddr: this.dogAdoptionForm.get('adoptionData.prevAddr').value,
      dayPhoneNum: this.dogAdoptionForm.get('adoptionData.dayPhoneNum').value,
      dayPhoneBestTime: this.dogAdoptionForm.get('adoptionData.dayPhoneBestTime').value,
      eveningPhoneNum: this.dogAdoptionForm.get('adoptionData.eveningPhoneNum').value,
      eveningPhoneBestTime: this.dogAdoptionForm.get('adoptionData.eveningPhoneBestTime').value,
      emailAddr: this.dogAdoptionForm.get('adoptionData.emailAddr').value,
      occupation: this.dogAdoptionForm.get('adoptionData.occupation').value,
      rentOrOwnC1: this.dogAdoptionForm.get('adoptionData.rentOrOwnChoices.rentOrOwnC1').value,
      rentOrOwnC2: this.dogAdoptionForm.get('adoptionData.rentOrOwnChoices.rentOrOwnC2').value,
      typeOfHomeC1: this.dogAdoptionForm.get('adoptionData.typeOfHomeChoices.typeOfHomeC1').value,
      typeOfHomeC2: this.dogAdoptionForm.get('adoptionData.typeOfHomeChoices.typeOfHomeC2').value,
      typeOfHomeC3: this.dogAdoptionForm.get('adoptionData.typeOfHomeChoices.typeOfHomeC3').value,
      typeOfHomeC4: this.dogAdoptionForm.get('adoptionData.typeOfHomeChoices.typeOfHomeC4').value,
      hasYardC1: this.dogAdoptionForm.get('adoptionData.hasYardChoices.hasYardC1').value,
      hasYardC2: this.dogAdoptionForm.get('adoptionData.hasYardChoices.hasYardC2').value,
      landlordContactInfo: this.dogAdoptionForm.get('adoptionData.landlordContactInfo').value,
      vetFullName: this.dogAdoptionForm.get('adoptionData.vetFullName').value,
      vetPhone: this.dogAdoptionForm.get('adoptionData.vetPhone').value,
      vetAddr: this.dogAdoptionForm.get('adoptionData.vetAddr').value,
      prevVetC1: this.dogAdoptionForm.get('adoptionData.prevVetChoices.prevVetC1').value,
      prevVetC2: this.dogAdoptionForm.get('adoptionData.prevVetChoices.prevVetC2').value,
      whyAdoptC1: this.dogAdoptionForm.get('adoptionData.whyAdoptChoices.whyAdoptC1').value,
      whyAdoptC2: this.dogAdoptionForm.get('adoptionData.whyAdoptChoices.whyAdoptC2').value,
      whyAdoptC3: this.dogAdoptionForm.get('adoptionData.whyAdoptChoices.whyAdoptC3').value,
      whyAdoptC4: this.dogAdoptionForm.get('adoptionData.whyAdoptChoices.whyAdoptC4').value,
      whyAdoptC5: this.dogAdoptionForm.get('adoptionData.whyAdoptChoices.whyAdoptC5').value,
      pitbullCharcsC1: this.dogAdoptionForm.get('adoptionData.pitbullCharcsChoices.pitbullCharcsC1').value,
      pitbullCharcsC2: this.dogAdoptionForm.get('adoptionData.pitbullCharcsChoices.pitbullCharcsC2').value,
      prevPitbullOwnerC1: this.dogAdoptionForm.get('adoptionData.prevPitbullOwnerChoices.prevPitbullOwnerC1').value,
      prevPitbullOwnerC2: this.dogAdoptionForm.get('adoptionData.prevPitbullOwnerChoices.prevPitbullOwnerC2').value,
      petHoursAlone: this.dogAdoptionForm.get('adoptionData.petHoursAlone').value,
      behaviourRes: this.dogAdoptionForm.get('adoptionData.behaviourRes').value,
      numPets: this.dogAdoptionForm.get('adoptionData.numPets').value,
      petAgeList: this.dogAdoptionForm.get('adoptionData.petAgeList').value,
      numChildren: this.dogAdoptionForm.get('adoptionData.numChildren').value,
      childrenAgeList: this.dogAdoptionForm.get('adoptionData.childrenAgeList').value,
      numAdults: this.dogAdoptionForm.get('adoptionData.numAdults').value,
      adultsAgeList: this.dogAdoptionForm.get('adoptionData.adultsAgeList').value,
      allAgreeToAdoptionC1: this.dogAdoptionForm.get('adoptionData.allAgreeToAdoptionChoices.allAgreeToAdoptionC1').value,
      allAgreeToAdoptionC2: this.dogAdoptionForm.get('adoptionData.allAgreeToAdoptionChoices.allAgreeToAdoptionC2').value,
      criminalC1: this.dogAdoptionForm.get('adoptionData.criminalChoices.criminalC1').value,
      criminalC2: this.dogAdoptionForm.get('adoptionData.criminalChoices.criminalC2').value,
      signature: this.dogAdoptionForm.get('adoptionData.signature').value,
      reviewer: '',
      statusC1: false,
      statusC2: false,
      rejRes: '',
    }
    console.log(data);
    /*
      In a real-world app the submitted form data would get sent to the back-end and some sort of automation would take place 
      like creating a printable document from the data.
    */
  }

}
