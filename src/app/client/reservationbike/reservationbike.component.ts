import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { Bike } from '../../../models/bike';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { ReservationCreate } from '../../../models/reservationcreate';
import { DateFilterFn, MatDatepickerModule, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reservationbike',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule
  ],
  templateUrl: './reservationbike.component.html',
  styleUrl: './reservationbike.component.css'
})
export class ReservationbikeComponent implements OnInit {
 bike: Bike | null = null;
 form!: FormGroup;
 bikeId! :number;
 unavailableRanges: { start: Date; end: Date }[] = [];
 

 constructor(
  private bikeService: BikeService,
  private reservationService: ReservationService,
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private router: Router,
 
) {}

ngOnInit() {
  const id = +this.route.snapshot.paramMap.get('id')!;
  this.bikeId = id;
  forkJoin({
    bike: this.bikeService.getBikeById(id),
    unavailable: this.reservationService.getUnavailable(id)
  }).subscribe(({ bike, unavailable }: { bike: Bike; unavailable: { start: string; end: string }[] }) => {
    this.bike = bike;
    
    this.unavailableRanges = unavailable.map(i => ({
      start: new Date(i.start),
      end:   new Date(i.end)
    }));
    
    this.buildForm();
  });
}

private buildForm() {
  this.form = this.fb.group({
    startDate: [null, [Validators.required, this.noPastDateValidator]],
    endDate:   [null],
    quantity:  [1, [
      Validators.required,
      Validators.min(1),
      Validators.max(this.bike!.quantity)
    ]]
  }, {
    validators: this.dateOrderValidator
  });
}

dateOrderValidator(group: AbstractControl): ValidationErrors | null {
  const sd = group.get('startDate')!.value;
  const ed = group.get('endDate')!.value;
  if (!sd || !ed) return null;
  return new Date(ed) < new Date(sd) ? { dateOrder: true } : null;
}

onSubmit() {
if (this.form.invalid) return;

  
  const start: Date = this.form.value.startDate;
  const end: Date | null = this.form.value.endDate || null;

  
  start.setHours(15, 0, 0, 0);
  if (end) {
    end.setHours(15, 0, 0, 0);
  }

  
  const dto: ReservationCreate = {
    startDate: start.toISOString(),       
    endDate:   end ? end.toISOString() : undefined,
    items: [{ bikeId: this.bikeId, quantity: this.form.value.quantity }]
  };

  this.reservationService.createReservation(dto).subscribe({
    next: () => {
      alert('Reservation created');
      this.router.navigate(['/client/userpage']);
    },
    error: e => alert(e.error ?? e.message)
  });
}

noPastDateValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  return selectedDate < new Date() ? { pastDate: true } : null;
}


private toDay(d: Date) {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) 
       / (1000 * 60 * 60 * 24);
}

startDateFilter: DateFilterFn<Date | null> = d => {
  if (!d) return false;
  const day = this.toDay(d),
        today = this.toDay(new Date());
  
  return day >= today &&
    !this.unavailableRanges.some(r => {
      const s = this.toDay(r.start),
            e = this.toDay(r.end);
      return day >= s && day <= e;
    });
};

endDateFilter: DateFilterFn<Date | null> = d => {
  if (!d) return false;
  const day = this.toDay(d),
        today = this.toDay(new Date()),
        sd = this.form.get('startDate')!.value as Date | null;
  if (day < today) return false;
  if (sd && this.toDay(sd) > day) return false;
  return !this.unavailableRanges.some(r => {
    const s = this.toDay(r.start),
          e = this.toDay(r.end);
    return day >= s && day <= e;
  });
};


dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  if (view !== 'month') return '';
  const day = this.toDay(cellDate);
  return this.unavailableRanges.some(r => {
    const s = this.toDay(r.start), e = this.toDay(r.end);
    return day >= s && day <= e;
  })
    ? 'unavailable-date'
    : '';
};
  
  }


