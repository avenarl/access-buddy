import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  avatarPreview: string | ArrayBuffer | null = null;
  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Retrieve the user and set the form values
    const userId = this.route.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.emailValidator(userId ? +userId : undefined),
        ],
      ],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });

    if (userId) {
      const user = this.userService.getUserbyId(+userId);
      if (user) {
        this.form.patchValue(user);
      }
    }
  }
  emailValidator(excludeUserId?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (this.userService.checkDuplicateEmail(email, excludeUserId)) {
        return { duplicateEmail: true };
      }
      return null;
    };
  }

  updateUser() {
    if (this.form.valid) {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        const user = this.userService.getUserbyId(+userId);
        if (user) {
          const updatedUser: User = {
            id: +userId,
            firstName: this.form.get('firstName')?.value ?? '',
            lastName: this.form.get('lastName')?.value ?? '',
            birthDate: this.form.get('birthDate')?.value ?? '',
            gender: this.form.get('gender')?.value ?? '',
            email: this.form.get('email')?.value ?? '',
            mobileNumber: this.form.get('mobileNumber')?.value ?? '',
            address: this.form.get('address')?.value ?? '',
            password: user.password, // Use the original password
            role: user.role, // Use the original role
          };
          this.userService.updateUser(+userId, updatedUser); // Pass both id and updatedUser as arguments
          this.router.navigate(['/users']);
        }
      }
    }
  }

  // Image upload
  onFileDropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const fileSize = file.size / 1024 / 1024; // converts bytes to MB
          if (fileSize <= 5) {
            // check file size  if <= 5MB
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
              this.avatarPreview = event.target?.result ?? null;
            };
            reader.readAsDataURL(file);
          } else {
            alert('Please upload an image smaller than 5MB.');
          }
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  onFileInvalid(errorMessage: string) {
    alert('Invalid file type. Please upload an image file.');
  }
}
