package hoainam.com.model;

/**
 * Created by Admin on 4/30/2017.
 */

public class Location {
    private String city;
    private String district;
    private String address;

    public Location(String city, String district, String address) {
        this.city = city;
        this.district = district;
        this.address = address;
    }

    public Location(String city, String district) {

        this.city = city;
        this.district = district;
    }

    public Location() {
    }

    public String getAddress() {

        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

}
