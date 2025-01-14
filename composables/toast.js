import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    animation: false,
    timerProgressBar: true,
});

export const showToast = (icon, title) => {
    Toast.fire({
        icon: icon,
        title: title,
    });
};

export const showPromoAlert = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Okay',
      customClass: {
        title: 'font-bold text-lg',
        text: 'text-base',
        confirmButton: 'bg-blue-500 text-white font-semibold rounded-lg',
      },
      backdrop: true,
      allowOutsideClick: false,
      timer: 3000, 
    })
}