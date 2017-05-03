package hoainam.com.huongdichvu;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import hoainam.com.adapter.ListAdapter;
import hoainam.com.model.House;
import hoainam.com.utilities.Get;
import static hoainam.com.utilities.Get.getCity;
import static hoainam.com.utilities.Get.getDistrict;
import static hoainam.com.utilities.Path.URL_CITY;
import static hoainam.com.utilities.Path.URL_DISTRICT;
import static hoainam.com.utilities.Path.URL_SEARCH;
import static hoainam.com.utilities.Path.URL_WEBSERVICE_SERVER;
import static hoainam.com.utilities.Validate.isTextValid;

public class TabList extends AppCompatActivity  {
    Spinner spCity;
    Spinner spDistrict;
    EditText etPrice, etSquare;
    Button btnFind;
    ArrayList<String> listCity = new ArrayList<>();
    ArrayList<String> listDistrict = new ArrayList<>();
    ArrayAdapter<String> myApdaterCity,myApdaterDis;
    String city,district;
    String queryCity,queryDistrict;
    ListAdapter listAdapter;
    ListView lvList;
    ArrayList<House> house;
    String url;
    String price,square;
    public static final String EXTRA_COUNTRY = "EXTRA_COUNTRY";
    private static final int REQUEST_RESPONSE = 1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tab_list);
        addControl();
        addEvent();


    }

    private void addEvent() {
        spCity.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                city = listCity.get(position).toString();
                try {
                    queryCity = URLEncoder.encode(city, "utf-8");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                listDistrict = getDistrict(URL_WEBSERVICE_SERVER+URL_DISTRICT+queryCity);
                myApdaterDis = new ArrayAdapter<String>(TabList.this,android.R.layout.simple_list_item_1,listDistrict);
                myApdaterDis.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                spDistrict.setAdapter(myApdaterDis);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        spDistrict.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                district = listDistrict.get(position).toString();
                try {
                    queryDistrict = URLEncoder.encode(district, "utf-8");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        btnFind.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                house = new ArrayList<House>();
                check();
                house = Get.getHouse(url);
                Log.e("onClick: ",url);
                if (house.size() > 0) {
                    listAdapter = new ListAdapter(TabList.this, R.layout.list_layout, house);
                    lvList.setAdapter(listAdapter);
                }
                else {
                    Toast.makeText(getBaseContext(), "Không có kết quả", Toast.LENGTH_SHORT).show();
                }

            }
        });
        lvList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(TabList.this, TabListDetail.class);
                intent.putExtra(EXTRA_COUNTRY, listAdapter.getItem(position).getId());
                startActivityForResult(intent, REQUEST_RESPONSE);
            }
        });
    }

    private void addControl() {
        btnFind = (Button) findViewById(R.id.btnFind);
        spCity = (Spinner) findViewById(R.id.spCity);
        etPrice = (EditText) findViewById(R.id.etPrice);
        etSquare = (EditText) findViewById(R.id.etSquare);
        listCity = getCity(URL_WEBSERVICE_SERVER+URL_CITY);
        myApdaterCity = new ArrayAdapter<String>(TabList.this,android.R.layout.simple_list_item_1,listCity);
        myApdaterCity.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spCity.setAdapter(myApdaterCity);
        spDistrict = (Spinner) findViewById(R.id.spDistrict);
        lvList = (ListView) findViewById(R.id.lvList);


    }

    public void check() {
        url = URL_WEBSERVICE_SERVER+URL_SEARCH;
        price = etPrice.getText().toString();
        square = etSquare.getText().toString();
        if(city!=listCity.get(0).toString() ){
            if(district==listDistrict.get(0).toString()) {
                url =  url+"?city="+queryCity;
            }
            else url = url+"?city="+queryCity+"&district="+queryDistrict;
        }

        if(isTextValid(price)) {
            url = url + "&price=" + price;
        }
        if(isTextValid(square)) {
            url = url + "&square=" + square;
        }
    }
}
