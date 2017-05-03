package hoainam.com.model;

/**
 * Created by Admin on 4/30/2017.
 */

public class House {
    private String id;
    private int stt;
    private String poster_id;
    private int floorNo;
    private int basementNo;
    private double square;
    private long price;
    private int bathroomNo;
    private int bedroomNo;
    private int livingroomNo;
    private int kitchenNo;
    private Location location;
    private User contact;
    private boolean onSale;
    private boolean available;
    private String img_Link;

    public String getImg_Link() {
        return img_Link;
    }

    public void setImg_Link(String img_Link) {
        this.img_Link = img_Link;
    }

    public House() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getStt() {
        return stt;
    }

    public void setStt(int stt) {
        this.stt = stt;
    }

    public String getPoster_id() {
        return poster_id;
    }

    public void setPoster_id(String poster_id) {
        this.poster_id = poster_id;
    }

    public int getFloorNo() {
        return floorNo;
    }

    public void setFloorNo(int floorNo) {
        this.floorNo = floorNo;
    }

    public int getBasementNo() {
        return basementNo;
    }

    public void setBasementNo(int basementNo) {
        this.basementNo = basementNo;
    }

    public double getSquare() {
        return square;
    }

    public void setSquare(double square) {
        this.square = square;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public int getBathroomNo() {
        return bathroomNo;
    }

    public void setBathroomNo(int bathroomNo) {
        this.bathroomNo = bathroomNo;
    }

    public int getBedroomNo() {
        return bedroomNo;
    }

    public void setBedroomNo(int bedroomNo) {
        this.bedroomNo = bedroomNo;
    }

    public int getLivingroomNo() {
        return livingroomNo;
    }

    public void setLivingroomNo(int livingroomNo) {
        this.livingroomNo = livingroomNo;
    }

    public int getKitchenNo() {
        return kitchenNo;
    }

    public void setKitchenNo(int kitchenNo) {
        this.kitchenNo = kitchenNo;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public User getContact() {
        return contact;
    }

    public void setContact(User contact) {
        this.contact = contact;
    }

    public boolean isOnSale() {
        return onSale;
    }

    public void setOnSale(boolean onSale) {
        this.onSale = onSale;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
    
}
