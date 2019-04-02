package host.exp.exponent;

import android.os.Bundle;

import com.facebook.react.ReactPackage;

import java.util.List;

import expo.core.interfaces.Package;
import host.exp.exponent.generated.DetachBuildConstants;
import host.exp.exponent.experience.DetachActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends DetachActivity {

  @Override
  public String publishedUrl() {
    return "exp://exp.host/@oksanak/reactnativecourse-module-4";
  }

  @Override
  public String developmentUrl() {
    return DetachBuildConstants.DEVELOPMENT_URL;
  }

  @Override
  public List<ReactPackage> reactPackages() {
    return ((MainApplication) getApplication()).getPackages();
  }

  @Override
  public List<Package> expoPackages() {
    return ((MainApplication) getApplication()).getExpoPackages();
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Override
  public Bundle initialProps(Bundle expBundle) {
    // Add extra initialProps here
    return expBundle;
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState);
  }
}
