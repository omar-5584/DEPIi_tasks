const SUPABASE_URL = 'https://gyukgrrdmfaidxhgjzvy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jJu72RK7i5qhlDaAj8KZIQ_5VeVLHfa';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



console.log("الملف اشتغل وتصل بنجاح!");

const form = document.getElementById("signupForm")


form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const formData = {
        Fullname: document.getElementById('fullname').value,
        Email: document.getElementById('email').value,
        Password: document.getElementById('password').value,
        Phone: document.getElementById('phone').value,
    };

    const { data, error } = await supabaseClient
        .from('Client')
        .insert([formData]);


    if (error) {
        alert('حدث خطأ أثناء الإرسال: ' + error.message);
    } else {
        alert('تم حفظ البيانات بنجاح! 🎉');
        form.reset(); // لتفريغ الحقول بعد الإرسال
    }

})

