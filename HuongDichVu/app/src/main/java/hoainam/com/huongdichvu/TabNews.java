package hoainam.com.huongdichvu;

import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import java.io.File;

import hoainam.com.utilities.Post;

public class TabNews extends AppCompatActivity {
    Spinner spCity, spDistrict;
    EditText etAddress, etPrice, etSquare, etfloorNo, etbasementNo, etlivingroomNo, etbedroomNo,
            etbathroomNo, etkitchenNo;
    Button btnUp;

    Button btnchoose;
    ImageView imageView;

    public static final int ACTIVITY_SELECT = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tab_news);
        addControl();
        addEvent();

    }

    private void addEvent() {

        btnchoose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_PICK,
                        MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                startActivityForResult(intent, ACTIVITY_SELECT);
            }
        });

    }


    String selectedImagePath;
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode == RESULT_OK){
            if(requestCode == ACTIVITY_SELECT){
                Uri selectedImageUri = data.getData();
                selectedImagePath = getPath(selectedImageUri);
//            Toast.makeText(this, selectedImagePath, Toast.LENGTH_SHORT).show();
                File file = new File(selectedImagePath);
                Log.d("string", selectedImagePath);
                if(file.exists()) {
                    Toast.makeText(this, selectedImagePath, Toast.LENGTH_LONG).show();
                    Bitmap myBitmap = BitmapFactory.decodeFile(file.getAbsolutePath());
                    imageView.setImageBitmap(myBitmap);
                    String url = Post.executeMultiPartRequest("http://localhost:3333/imageupload/add",file);
                    Log.e("onActivityResult: ",url );
                }

            }
        }
    }

    public String getPath(Uri uri) {

        if( uri == null ) {
            return null;
        }

        // this will only work for images selected from gallery
        String[] projection = { MediaStore.Images.Media.DATA };
        Cursor cursor = managedQuery(uri, projection, null, null, null);
        if( cursor != null ){
            int column_index = cursor
                    .getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            cursor.moveToFirst();
            return cursor.getString(column_index);
        }

        return uri.getPath();
    }

    private void addControl() {
        spCity = (Spinner) findViewById(R.id.spCity);
        spDistrict = (Spinner) findViewById(R.id.spDistrict);
        etAddress = (EditText) findViewById(R.id.etAddress);
        etPrice = (EditText) findViewById(R.id.etPrice);
        etSquare = (EditText) findViewById(R.id.etSquare);
        etfloorNo = (EditText) findViewById(R.id.etfloorNo);
        etbasementNo = (EditText) findViewById(R.id.etbasementNo);
        etlivingroomNo = (EditText) findViewById(R.id.etlivingroomNo);
        etbedroomNo = (EditText) findViewById(R.id.etbedroomNo);
        etbathroomNo = (EditText) findViewById(R.id.etbathroomNo);
        etkitchenNo = (EditText) findViewById(R.id.etkitchenNo);
        btnUp = (Button) findViewById(R.id.btnUp);
        btnchoose = (Button) findViewById(R.id.btnChoose);
        imageView = (ImageView) findViewById(R.id.imageView);
    }
}
