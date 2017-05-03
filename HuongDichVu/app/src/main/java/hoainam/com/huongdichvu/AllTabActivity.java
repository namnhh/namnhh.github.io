package hoainam.com.huongdichvu;

import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TabHost;
import android.app.TabActivity;
import android.widget.Toast;

public class AllTabActivity extends TabActivity {
    TabHost tabHost;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tab);
        addControl();
        addEvent();
    }

    private void addEvent() {
        tabHost.setOnTabChangedListener(new TabHost.OnTabChangeListener() {
            @Override
            public void onTabChanged(String tabId) {
                // display the name of the tab whenever a tab is changed
                    // TODO Auto-generated method stub
                    for(int i=0;i<tabHost.getTabWidget().getChildCount();i++)
                    {
                        tabHost.getTabWidget().getChildAt(i).setBackgroundColor(Color.parseColor("#FFFFFF")); //unselected
                    }
                    tabHost.getTabWidget().getChildAt(tabHost.getCurrentTab()).setBackgroundColor(Color.parseColor("#98F5FF")); // selected
                }
        });
    }

    private void addControl() {
        tabHost = (TabHost) findViewById(android.R.id.tabhost);
        TabHost.TabSpec tabList=tabHost.newTabSpec("tabList");
        tabList.setIndicator("Tìm Kiếm");
        tabList.setContent(new Intent(this,TabList.class));
        tabHost.addTab(tabList);

        TabHost.TabSpec tabNews=tabHost.newTabSpec("tabNews");
        tabNews.setIndicator("Đăng Tin");
        tabNews.setContent(new Intent(this,TabNews.class));
        tabHost.addTab(tabNews);

        TabHost.TabSpec tabFeeBack=tabHost.newTabSpec("tabFeeBack");
        tabFeeBack.setIndicator("Phản Hồi");
        tabFeeBack.setContent(new Intent(this,TabFeeBack.class));
        tabHost.addTab(tabFeeBack);

        TabHost.TabSpec tabAccount=tabHost.newTabSpec("tabAccount");
        tabAccount.setIndicator("Cá Nhân");
        tabAccount.setContent(new Intent(this,TabAccount.class));
        tabHost.addTab(tabAccount);
        tabHost.getTabWidget().getChildAt(0).setBackgroundColor(Color.parseColor("#98F5FF"));


    }
}
