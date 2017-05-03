package hoainam.com.huongdichvu;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

import hoainam.com.model.House;
import hoainam.com.utilities.Get;
import hoainam.com.utilities.Path;

public class TabListDetail extends AppCompatActivity {
    TextView txtCity, txtDistrict, txtAddress, txtPrice, txtSquare, txtfloorNo, txtbasementNo,
            txtlivingroomNo, txtbedroomNo, txtbathroomNo, txtkitchenNo, txtName, txtPhone;
    String country ;
    House house;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tab_list_detail);
        country = getIntent().getStringExtra(TabList.EXTRA_COUNTRY);
        Toast.makeText(getBaseContext(), country, Toast.LENGTH_SHORT).show();
        addControl();
        addEvent();

    }

    private void addEvent() {
        String url = Path.URL_WEBSERVICE_SERVER+Path.URL_GETHOUSE+country;
        Log.e("addEvent",url );
        house = new House();
        house = Get.getHouseDetail(url);
        txtCity.setText(" "+house.getLocation().getCity().toString());
        txtDistrict.setText(" "+house.getLocation().getDistrict().toString());
        txtAddress.setText(house.getLocation().getAddress().toString());
        txtPrice.setText(house.getPrice()+"");
        txtSquare.setText(house.getSquare()+" m2");
        txtfloorNo.setText(house.getFloorNo()+"");
        txtbasementNo.setText(house.getBasementNo()+"");
        txtlivingroomNo.setText(house.getLivingroomNo()+"");
        txtbathroomNo.setText(house.getBathroomNo()+"");
        txtbedroomNo.setText(house.getBedroomNo()+"");
        txtkitchenNo.setText(house.getKitchenNo()+"");
        txtName.setText(house.getContact().getName());
        txtPhone.setText(house.getContact().getPhone());
    }

    private void addControl() {
        txtCity = (TextView) findViewById(R.id.txtCity);
        txtDistrict = (TextView) findViewById(R.id.txtDistrict);
        txtAddress = (TextView) findViewById(R.id.txtAddress);
        txtPrice = (TextView) findViewById(R.id.txtPrice);
        txtSquare = (TextView) findViewById(R.id.txtSquare);
        txtfloorNo = (TextView) findViewById(R.id.txtfloorNo);
        txtbasementNo = (TextView) findViewById(R.id.txtbasementNo);
        txtlivingroomNo = (TextView) findViewById(R.id.txtlivingroomNo);
        txtbedroomNo = (TextView) findViewById(R.id.txtbedroomNo);
        txtbathroomNo = (TextView) findViewById(R.id.txtbathroomNo);
        txtkitchenNo = (TextView) findViewById(R.id.txtkitchenNo);
        txtName = (TextView) findViewById(R.id.txtName);
        txtPhone = (TextView) findViewById(R.id.txtPhone);

    }
}
