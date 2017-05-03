package hoainam.com.adapter;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.support.annotation.IdRes;
import android.support.annotation.LayoutRes;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import hoainam.com.huongdichvu.R;
import hoainam.com.model.House;
import static hoainam.com.utilities.Path.URL_CITY;
import static hoainam.com.utilities.Path.URL_WEBSERVICE_SERVER;


/**
 * Created by Admin on 5/2/2017.
 */

public class ListAdapter extends ArrayAdapter<House> {
    Activity context;
    int resource;
    ArrayList<House> objects;
    TextView txtAddress, txtPrice, txtSquare, txtDistrict, txtCity;
    ImageView imgLink;

    public ListAdapter(Activity context, int resource, ArrayList<House> objects) {
        super(context, resource, objects);
        this.context = context;
        this.resource = resource;
        this.objects = objects;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater inflater = this.context.getLayoutInflater();
        View view = inflater.inflate(this.resource, null);
        txtAddress = (TextView) view.findViewById(R.id.txtAddress);
        txtPrice = (TextView) view.findViewById(R.id.txtPrice);
        txtSquare = (TextView) view.findViewById(R.id.txtSquare);
        txtDistrict= (TextView) view.findViewById(R.id.txtDistrict);
        imgLink = (ImageView) view.findViewById(R.id.imgLink);

        House house = this.objects.get(position);
        txtAddress.setText(house.getLocation().getAddress());
        txtPrice.setText("Giá: "+Long.toString(house.getPrice()));
        txtSquare.setText("Diện tích: "+Double.toString(house.getSquare()));
        txtDistrict.setText(house.getLocation().getDistrict()+" - "+house.getLocation().getCity());
        if(house.getImg_Link().equalsIgnoreCase("")) {
            imgLink.setImageResource(R.drawable.images);
        }
        else {
            new DownloadImageTask(imgLink).execute(house.getImg_Link());
            Log.e("getView: ",house.getImg_Link() );
        }
        return view;
    }

    private class DownloadImageTask extends AsyncTask<String, Void, Bitmap> {
        ImageView bmImage;

        public DownloadImageTask(ImageView bmImage) {
            this.bmImage = bmImage;
        }

        protected Bitmap doInBackground(String... urls) {
            String urldisplay = urls[0];
            Bitmap mIcon11 = null;
            try {
                InputStream in = new java.net.URL(urldisplay).openStream();
                mIcon11 = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                Log.e("Error", e.getMessage());
                e.printStackTrace();
                Bitmap bitmap = BitmapFactory.decodeResource(context.getResources(), R.drawable.error);
                mIcon11 =bitmap;
            }

            return mIcon11;
        }

        protected void onPostExecute(Bitmap result) {
            bmImage.setImageBitmap(result);
        }

    }


}
