package hoainam.com.model;

/**
 * Created by Admin on 4/30/2017.
 */

public class Feeback {
    private hoainam.com.model.User User;
    private String content;

    public hoainam.com.model.User getUser() {
        return User;
    }

    public void setUser(hoainam.com.model.User user) {
        User = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Feeback(hoainam.com.model.User user, String content) {

        User = user;
        this.content = content;
    }
}
