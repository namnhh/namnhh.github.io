package hoainam.com.utilities;

/**
 * Created by Admin on 4/30/2017.
 */

public class Validate {
        /**
         * Check text is empty or not
         *
         * @param s
         * @return
         */
        static public boolean isTextValid(String s) {
            if (s.isEmpty() || s.trim().equalsIgnoreCase("")) {
                return false;
            }
            return true;
        }

        /**
         * Check valid email
         *
         * @param email
         * @return
         */
        static public boolean isEmailValid(CharSequence email) {
            return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches();
        }

}
