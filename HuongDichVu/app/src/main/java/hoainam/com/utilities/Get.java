package hoainam.com.utilities;

import android.os.StrictMode;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import hoainam.com.model.House;
import hoainam.com.model.Location;
import hoainam.com.model.User;

/**
 * Created by Admin on 5/2/2017.
 */

public class Get {
    public static ArrayList<String> getCity (String path){
        ArrayList<String> listCity = new ArrayList<>();
        try {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
            URL url=new URL(path);
            HttpURLConnection connection= (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-type", "application/json; charset=utf-8");
            //lấy dữ liệu mà server trả về
            InputStream is= connection.getInputStream();
            InputStreamReader isr=new InputStreamReader(is,"UTF-8");
            BufferedReader br=new BufferedReader(isr);
            String line=br.readLine();
            StringBuilder builder=new StringBuilder();
            while (line!=null)
            {
                builder.append(line);
                line=br.readLine();
            }
            String json=builder.toString();
            JSONObject jsonObject = new JSONObject(json);

            if (jsonObject.has("data")) {
                JSONArray jsonData = jsonObject.getJSONArray("data");
                listCity.add("Tất cả");
                for (int i = 0; i < jsonData.length(); i++)
                {
                    JSONObject item = jsonData.getJSONObject(i);
                    if (item.has("city")) {
                        listCity.add(item.getString("city"));
                    }
                }
            }

        }
        catch (Exception ex) {
            Log.e("LOI", ex.toString());
        }
        return listCity;
    }

    public static ArrayList<String> getDistrict (String path){
        ArrayList<String> listDistrict = new ArrayList<>();
        try {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
            URL url=new URL(path);
            HttpURLConnection connection= (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-type", "application/json; charset=utf-8");
            //lấy dữ liệu mà server trả về
            InputStream is= connection.getInputStream();
            InputStreamReader isr=new InputStreamReader(is,"UTF-8");
            BufferedReader br=new BufferedReader(isr);
            String line=br.readLine();
            StringBuilder builder=new StringBuilder();
            while (line!=null)
            {
                builder.append(line);
                line=br.readLine();
            }
            String json=builder.toString();
            JSONObject jsonObject = new JSONObject(json);

            if (jsonObject.has("data")) {
                JSONArray jsonData = jsonObject.getJSONArray("data");
                JSONObject jsonDis = jsonData.getJSONObject(0);
                JSONArray jsonDistrict = jsonDis.getJSONArray("districts");
                listDistrict.add("Tất cả");
                for (int i = 0; i < jsonDistrict.length(); i++) {
                    {
                        listDistrict.add(jsonDistrict.getString(i));
                    }
                }

            }

        }
        catch (Exception ex) {
            Log.e("LOI", ex.toString());
        }
        return listDistrict;
    }

    public static ArrayList<House> getHouse (String path){
        ArrayList<House> listHouse = new ArrayList<>();
        try {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
            URL url = new URL(path);
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
                        if (item.has("_id")) {
                            itemHouse.setId(item.getString("_id"));
                            Log.e("doInBackground: ",itemHouse.getId());
                        }
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
                        if(item.has("img_Link")) {
                            String lo;
                            JSONArray img = item.getJSONArray("img_Link");
                            if (img.length() == 0) {
                                lo = "";
                            }
                            else lo = img.getString(0);
                            Log.e("img: ",lo );
                            itemHouse.setImg_Link(lo);
                        }
                        if(itemHouse.isOnSale()) { listHouse.add(itemHouse);}
                    }
                }  else Log.e("doInBackground: ","k co ak" );
            }
            else Log.e("doInBackground: ","k co" );
        } catch (Exception ex) {
            Log.e("LOI", ex.toString());
        }
        return listHouse;
    }

    public static House getHouseDetail (String path){
        House itemHouse = new House();
        try {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
            URL url = new URL(path);
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
                JSONObject item = jsonObject.getJSONObject("data");
                        if (item.has("_id")) {
                            itemHouse.setId(item.getString("_id"));
                            Log.e("doInBackground: ",itemHouse.getId());
                        }
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


                }  else Log.e("doInBackground: ","k co ak" );
        } catch (Exception ex) {
            Log.e("LOI", ex.toString());
        }
        return itemHouse;
    }
}
