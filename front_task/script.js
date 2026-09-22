const SUPABASE_URL = 'https://gyukgrrdmfaidxhgjzvy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jJu72RK7i5qhlDaAj8KZIQ_5VeVLHfa';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^01[0125][0-9]{8}$/;

console.log("الملف اشتغل وتصل بنجاح!");

const form = document.getElementById("signupForm")


form.addEventListener('submit', async (e) => {

    e.preventDefault();

const emailValue=document.getElementById('email').value;
const phoneValue=document.getElementById('phone').value;

if (!emailRegex.test(emailValue)) {
    alert('⚠️ عذراً، صيغة البريد الإلكتروني غير صحيحة!');
    return; 
  }

  if (!phoneRegex.test(phoneValue)) {
    alert('⚠️ عذراً، رقم الهاتف غير صحيح (يجب أن يكون رقم مصري صحيح مكون من 11 رقماً)!');
    return; 
  }

  

    const formData = {
        Fullname: document.getElementById('fullname').value,
        Email: emailValue,
        Password: document.getElementById('password').value,
        Phone: phoneValue
    };




    const { data, error } = await supabaseClient
        .from('Client')
        .insert([formData]);


    if (error) {
        alert('حدث خطأ أثناء الإرسال: ' + error.message);
    } else {
        alert('تم حفظ البيانات بنجاح! 🎉');
        form.reset(); 
    }

})

