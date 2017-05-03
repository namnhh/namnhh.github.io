package hoainam.com.huongdichvu;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONObject;

import hoainam.com.model.User;

import static hoainam.com.utilities.Path.URL_SIGNUP;
import static hoainam.com.utilities.Path.URL_WEBSERVICE_SERVER;
import static hoainam.com.utilities.Post.postSignUp;
import static hoainam.com.utilities.Validate.isEmailValid;
import static hoainam.com.utilities.Validate.isTextValid;

public class SignUpActivity extends AppCompatActivity {
    EditText etName, etPass, etPhone, etEmail;
    Button btnSignUp;
    public static User user;
    String email, password, name, phone;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        addControl();
        addEvent();
    }

    private void addEvent() {
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SignUp();
            }
        });

    }

    private void addControl() {
        etEmail = (EditText) findViewById(R.id.etEmail);
        etPass = (EditText) findViewById(R.id.etPass);
        etPhone = (EditText) findViewById(R.id.etPhone);
        etName = (EditText) findViewById(R.id.etName);
        btnSignUp = (Button) findViewById(R.id.btnSignUp);
    }

    private void SignUp() {
        email = etEmail.getText().toString();
        password = etPass.getText().toString();
        phone =  etPhone.getText().toString();
        name = etName.getText().toString();
        if(!isTextValid(email)  || !isTextValid(password) || !isTextValid(phone) || !isTextValid(name)) {
            Toast.makeText(getBaseContext(), "Nhập đầy đủ các trường", Toast.LENGTH_SHORT).show();
        }
        else if (!isEmailValid(email)) {
            Toast.makeText(getBaseContext(), "Nhập đúng kiểu email", Toast.LENGTH_SHORT).show();
        }
        else {
            // call AsynTask to perform network operation on separate thread
            new SignUpAsyncTask().execute(URL_WEBSERVICE_SERVER+URL_SIGNUP);
        }
    }

    private class SignUpAsyncTask extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... urls) {
            user = new User();
            user.setEmail(email);
            user.setPassword(password);
            user.setName(name);
            user.setPhone(phone);
            String json = postSignUp(urls[0],user);
            String mess = "";
            try {
                JSONObject jsonObject = new JSONObject(json);
                if (jsonObject.has("data")) {
                    JSONObject jsonData = jsonObject.getJSONObject("data");
                    mess = "Đăng kí thành công";
                    Intent acIntent = new Intent(SignUpActivity.this,MainActivity.class);
                    SignUpActivity.this.startActivity(acIntent);
                }
                else {
                    mess = "Email đã tồn tại";
                }
            }
            catch (Exception ex) {
                Log.e("LOI", ex.toString());
            }
            return mess;
        }
        // onPostExecute displays the results of the AsyncTask.
        @Override
        protected void onPostExecute(String result) {
            Toast.makeText(getBaseContext(), result, Toast.LENGTH_LONG).show();
        }
    }


}
