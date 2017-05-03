package hoainam.com.huongdichvu;

import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import static hoainam.com.huongdichvu.MainActivity.MY_PREFS_NAME;

public class TabAccount extends AppCompatActivity {
    String name,email,phone,token;
    TextView txtName;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tab_account);
        SharedPreferences prefs = getSharedPreferences(MY_PREFS_NAME, MODE_PRIVATE);
            name = prefs.getString("name", "No name defined");
            Log.e("onCreate: ", name);
            email = prefs.getString("email", "No email defined");
            phone = prefs.getString("phone", "No phone defined");
            token = prefs.getString("token", "No token defined");
            txtName = (TextView) findViewById(R.id.txtName);
            txtName.setText(name.toString());
    }
}
