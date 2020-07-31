export const add_lot={
    owner_name:{
        required:'Owner Name is Required'
    },
    owner_email:{
        required: 'Email is required.',
        email: 'Email not in valid format.'
    },
    owner_mobile:{
        required: 'Mobile Number is required.',
        pattern: 'Mobile Number must contain only numbers.',
    },
    name:{
        required:'Location Name is required'
    },
    price:{
        required:'Price is Required',
        pattern:'Price should contain only numbers'
    }
};
export const login={
    username: {
        required: 'Username is required.',
    },
      password: {
        required: 'Password is required',
    },
};
export const register={
    fullname: {
        required: 'Full Name is required.',
        minlength: 'Full Name must be at least 2 characters long.',
        maxlength: 'Full Name cannot be more than 25 characters long.',
    },
    username: {
        required: 'User Name is required.',
        minlength: 'User Name must be at least 2 characters long.',
        maxlength: 'User Name cannot be more than 25 characters long.',
        notunique: 'Username already exists'
    },
    mobile: {
        required: 'Mobile Number is required.',
        pattern: 'Mobile Number must contain only numbers.',
    },
    email: {
        required: 'Email is required.',
        email: 'Email not in valid format.',
    },
    password: {
        required: 'Password is required',
        minlength: 'Password must be at least 6 characters long.',
    },
    confirmpassword: {
        required: 'Confirm Password is required',
        mustMatch: 'Password and Confirm Password doesnot match',
    },
}
export const reservation={
    fromdatetime: {
        required: 'From Date Time is required',
        lessthan: 'From Date Time should be less than To Date Time',
        invalid: 'From Date Time should be 2 hours later from now',
        unavailable: 'Parking Slot for this Time Frame is not Available',
    },
    todatetime: {
        lessthan: 'To Date Time should be greater than From Date Time',
        required: 'To Date Time is required',
    },
}