package hoainam.com.task;

import android.app.Activity;
import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import hoainam.com.adapter.ListAdapter;
import hoainam.com.huongdichvu.R;
import hoainam.com.huongdichvu.TabList;
import hoainam.com.model.House;
import hoainam.com.model.Location;
import hoainam.com.model.User;

/**
 * Created by Admin on 4/30/2017.
 */

public class ListTask extends AsyncTask<String, Void, ArrayList<House>> {
    Activity context;
    ListAdapter adapter;

    public ListTask(Activity context, ListAdapter adapter) {
        this.context = context;
        this.adapter = adapter;
    }

    @Override
    protected ArrayList<House> doInBackground(String... urls) {
        ArrayList<House> listHouse = new ArrayList<>();
        try {
            URL url = new URL(urls[0]);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-type", "application/json; charset=utf-8");

            //lấy dữ liệu mà server trả về
            InputStream is = connection.getInputStream();
            InputStreamReader isr = new InputStreamReader(is, "UTF-8");
            BufferedReader br = new BufferedReader(isr);
            String line = br.readLine();
            StringBuilder builder = new StringBuilder();
            while (line != null) {
                builder.append(line);
                line = br.readLine();
            }
            String json = builder.toString();
            JSONObject jsonObject = new JSONObject(json);
            if (jsonObject.has("data")) {
                JSONObject jsonDa = jsonObject.getJSONObject("data");
                if (jsonDa.has("items")) {
                    JSONArray jsonData = jsonDa.getJSONArray("items");
                    for (int i = 0; i < jsonData.length(); i++) {
                        Log.e("doInBackground: ", "house");
                        JSONObject item = jsonData.getJSONObject(i);
                        House itemHouse = new House();
                        if (item.has("stt")) {
                            itemHouse.setStt(Integer.parseInt(item.getString("stt")));
                            Log.e("doInBackground: ",itemHouse.getStt()+"" );
                        }
                        if (item.has("poster_id")) {
                            itemHouse.setPoster_id(item.getString("poster_id"));
                            Log.e("doInBackground: ",itemHouse.getPoster_id());
                        }
                        if (item.has("floorNo")) {
                            itemHouse.setFloorNo(Integer.parseInt(item.getString("floorNo")));
                        }
                        if (item.has("basementNo")) {
                            itemHouse.setBasementNo(Integer.parseInt(item.getString("basementNo")));
                        }
                        if (item.has("square")) {
                            itemHouse.setSquare(Double.parseDouble(item.getString("square")));
                        }
                        if (item.has("price")) {
                            itemHouse.setPrice(Long.parseLong(item.getString("price")));
                        }
                        if (item.has("bathroomNo")) {
                            itemHouse.setBathroomNo(Integer.parseInt(item.getString("bathroomNo")));
                        }
                        if (item.has("bedroomNo")) {
                            itemHouse.setBedroomNo(Integer.parseInt(item.getString("bedroomNo")));
                        }
                        if (item.has("livingroomNo")) {
                            itemHouse.setLivingroomNo(Integer.parseInt(item.getString("livingroomNo")));
                        }
                        if (item.has("kitchenNo")) {
                            itemHouse.setKitchenNo(Integer.parseInt(item.getString("kitchenNo")));
                        }
                        if (item.has("available")) {
                            itemHouse.setAvailable(Boolean.parseBoolean(item.getString("available")));
                        }
                        if (item.has("onSale")) {
                            itemHouse.setOnSale(Boolean.parseBoolean(item.getString("onSale")));
                        }
                        if (item.has("location")) {
                            Location location = new Location();
                            String lo = item.getString("location");
                            JSONObject itemContact = new JSONObject(lo);
                            location.setAddress(itemContact.getString("address"));
                            location.setDistrict(itemContact.getString("district"));
                            location.setCity(itemContact.getString("city"));
                            itemHouse.setLocation(location);
                            Log.e("doInBackground: ",itemHouse.getLocation().getAddress()+"" );
                        }
                        if (item.has("contact")) {
                            User user = new User();
                            String lo = item.getString("contact");
                            JSONObject itemContact = new JSONObject(lo);
                            user.setName(itemContact.getString("name"));
                            user.setPhone(itemContact.getString("phone"));
                            user.setEmail(itemContact.getString("email"));
                            itemHouse.setContact(user);
                            Log.e("doInBackground: ",itemHouse.getContact().getName()+"" );
                        }

                        listHouse.add(itemHouse);
                    }
                }  else Log.e("doInBackground: ","k co ak" );
            }
                else Log.e("doInBackground: ","k co" );
        } catch (Exception ex) {
            Log.e("LOI", ex.toString());
        }
        return listHouse;
    }
    @Override
    protected void onPostExecute(ArrayList<House> house) {
        super.onPostExecute(house);
        this.adapter.clear();
        this.adapter.addAll(house);
    }
    @Override
    protected void onProgressUpdate(Void... values) {
        super.onProgressUpdate(values);
    }
    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }
}