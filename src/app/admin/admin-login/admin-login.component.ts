import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  //vars
  //
  public errorMsg: string;
  public credentialDataForm: FormGroup;

  //title and meta tag vars
  //
  private title: string = "Pitbull Paradise | Admin Login";
  private metaDesc: string = "Pitbull Paradise | Admin Login";
  private robots: string = "NOINDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"

  constructor(private titleService: Title, private metaService: Meta, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    //set title and update meta tags
    //
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({ name: 'description', content: this.metaDesc });
    this.metaService.updateTag({ name: 'robots', content: this.robots });
    this.metaService.updateTag({ name: 'author', content: this.author });
    //form validators
    //
    this.credentialDataForm = new FormGroup({
      'credentialData': new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
      })
    });
  }

  onSubmit() {
    const username = this.credentialDataForm.get('credentialData.username').value;
    const password = this.credentialDataForm.get('credentialData.password').value;

    this.authService.signIn(username, password)
      .then(res => {
        //logged in
        console.log(res);
        if (res) {
          this.router.navigate(['/admin/panel']);
        } else {
          this.errorMsg = 'Invalid user or password.'
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
