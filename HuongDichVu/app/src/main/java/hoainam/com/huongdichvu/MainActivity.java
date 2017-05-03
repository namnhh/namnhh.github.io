package hoainam.com.huongdichvu;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import org.json.JSONObject;
import hoainam.com.model.User;

import static hoainam.com.utilities.Path.URL_LOGIN;
import static hoainam.com.utilities.Path.URL_WEBSERVICE_SERVER;
import static hoainam.com.utilities.Post.postLogin;
import static hoainam.com.utilities.Validate.isEmailValid;
import static hoainam.com.utilities.Validate.isTextValid;

public class MainActivity extends AppCompatActivity {
    EditText edEmail;
    EditText edPass;
    Button btnLogIn;
    TextView txtSignUp;
    public static User user;
    String email,password,phone,name;
    public static final String MY_PREFS_NAME = "MyPrefsFile";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        addControl();
        addEvent();
    }

    private void addEvent() {
        btnLogIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkLogin();

            }
        });

        txtSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent signUpIntent = new Intent(MainActivity.this,SignUpActivity.class);
                MainActivity.this.startActivity(signUpIntent);
            }
        });

    }

    private void addControl() {
        edEmail = (EditText) findViewById(R.id.etEmail);
        edPass = (EditText) findViewById(R.id.etPass);
        btnLogIn = (Button) findViewById(R.id.btnLogIn);
        txtSignUp = (TextView) findViewById(R.id.txtSignUp);

    }

    private void checkLogin() {
        email = edEmail.getText().toString();
        password = edPass.getText().toString();
        if(!isTextValid(email)  || !isTextValid(password)) {
            Toast.makeText(getBaseContext(), "Nhập email & password", Toast.LENGTH_SHORT).show();
        }
        else if (!isEmailValid(email)) {
            Toast.makeText(getBaseContext(), "Nhập đúng kiểu email", Toast.LENGTH_SHORT).show();
        }
        else {
            // call AsynTask to perform network operation on separate thread
            new LogInAsyncTask().execute(URL_WEBSERVICE_SERVER+URL_LOGIN);
        }
    }

    private class LogInAsyncTask extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... urls) {
            user = new User();
            user.setEmail(email);
            user.setPassword(password);
            String json = postLogin(urls[0],user);
            String mess = "";
            try {
                JSONObject jsonObject = new JSONObject(json);
                if (jsonObject.has("data")) {
                    JSONObject jsonData = jsonObject.getJSONObject("data");
                    String token = jsonData.getString("token").toString();
                    JSONObject jsonUser = jsonData.getJSONObject("user");
                    email =  jsonUser.getString("email");
                    name =  jsonUser.getString("name");
                    phone =  jsonUser.getString("phone");
                    mess = "Đăng nhập thành công";
                    SharedPreferences.Editor editor = getSharedPreferences(MY_PREFS_NAME, MODE_PRIVATE).edit();
                    editor.putString("email",email);
                    editor.putString("name", name);
                    editor.putString("phone", phone);
                    editor.putString("token",token);
                    editor.commit();
                    Intent tabIntent = new Intent(MainActivity.this,AllTabActivity.class);
                    MainActivity.this.startActivity(tabIntent);
                }
                else {
                    mess = "Email hoặc mật khẩu sai";
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
