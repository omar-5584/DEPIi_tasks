const SUPABASE_URL = 'https://gyukgrrdmfaidxhgjzvy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jJu72RK7i5qhlDaAj8KZIQ_5VeVLHfa';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^01[0125][0-9]{8}$/;

function checkInputValidity(inputElement, regex) {
    const value = inputElement.value;
    if (value === '') {
        inputElement.style.borderColor = '#ccc';
        return false;
    }
    if (regex.test(value)) {
        inputElement.style.borderColor = 'green';
        return true;
    } else {
        inputElement.style.borderColor = 'red';
        return false;
    }
}




const form = document.getElementById("signupForm")
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('conpass')

phoneInput.addEventListener('input', () => {

    checkInputValidity(phoneInput, phoneRegex)
})

emailInput.addEventListener('input', () => {

    checkInputValidity(emailInput, emailRegex)
})

confirmPasswordInput.addEventListener('input', () => {
    const passValue = passwordInput.value;
    const confirmVal = confirmPasswordInput.value;

    if (confirmVal === '') {
        confirmPasswordInput.style.borderColor = '#ccc';
    } else if (confirmVal === passValue) {
        confirmPasswordInput.style.borderColor = 'green';
    } else {
        confirmPasswordInput.style.borderColor = 'red';
    }

})

form.addEventListener('submit', async (e) => {

    e.preventDefault();



    if (!emailRegex.test(emailInput.value)) {
        alert(' عذراً، صيغة البريد الإلكتروني غير صحيحة!');
        return;
    }

    if (!phoneRegex.test(phoneInput.value)) {
        alert(' عذراً، رقم الهاتف غير صحيح (يجب أن يكون رقم مصري صحيح مكون من 11 رقماً)!');
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        alert(' عذراً، كلمة المرور!غير متطابقة');
        confirmPasswordInput.style.borderColor = 'red';
        return;
    }

    const formData = {
        Fullname: document.getElementById('fullname').value,
        Email: emailInput.value,
        Password: passwordInput.value,
        Phone: phoneInput.value,

    };




    const { data, error } = await supabaseClient
        .from('Client')
        .insert([formData]);


    if (error) {
        alert('حدث خطأ أثناء الإرسال: ' + error.message);
    } else {
        alert('تم حفظ البيانات بنجاح! ');
        form.reset();
        emailInput.style.borderColor = '#ccc';
        phoneInput.style.borderColor = '#ccc';
        confirmPasswordInput.style.borderColor = '#ccc';
    }

})

