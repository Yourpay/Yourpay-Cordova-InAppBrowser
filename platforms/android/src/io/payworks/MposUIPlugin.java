package io.payworks;

import android.content.Context;
import android.content.Intent;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

import java.math.BigDecimal;
import java.util.EnumSet;

import io.mpos.accessories.AccessoryFamily;
import io.mpos.accessories.parameters.AccessoryParameters;
import io.mpos.provider.ProviderMode;
import io.mpos.transactions.parameters.TransactionParameters;
import io.mpos.ui.shared.MposUi;
import io.mpos.ui.shared.model.MposUiConfiguration;

public class MposUIPlugin extends CordovaPlugin {

	private CallbackContext callbackContext;

	@Override
	public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;

		if(action.equals("transaction")) {
                    
                String PaymentText              = data.getJSONObject(0).getString("PaymentText");
                String FullAmount               = data.getJSONObject(0).getString("FullAmount");                
                String merchantIdentifier       = data.getJSONObject(0).getString("merchantIdentifier");                
                String merchantSecretKey        = data.getJSONObject(0).getString("merchantSecretKey");                
                String MerchantCurrency         = data.getJSONObject(0).getString("Currency");                
                String transactionidentifier    = data.getJSONObject(0).getString("transactionidentifier");                
                String productionmode           = data.getJSONObject(0).getString("production");                

                MposUi ui = MposUi.initialize(cordova.getActivity(), ProviderMode.LIVE,
					merchantIdentifier, merchantSecretKey);                    
                
			ui = MposUi.initialize(cordova.getActivity(), ProviderMode.TEST,
					merchantIdentifier, merchantSecretKey);                    

            ui.getConfiguration().setSummaryFeatures(EnumSet.of(
							// Add this line, if you do want to offer printed receipts
                                                        MposUiConfiguration.SummaryFeature.PRINT_CUSTOMER_RECEIPT,
                                                        // Add this line, if you do want to offer Printing Merchant Receipt
                                                        MposUiConfiguration.SummaryFeature.PRINT_MERCHANT_RECEIPT)
			);

   			//AccessoryParameters accessoryParameters = new AccessoryParameters.Builder(AccessoryFamily.MOCK).bluetooth().build();
			// using a real device
			//AccessoryParameters accessoryParameters = new AccessoryParameters.Builder(AccessoryFamily.MIURA_MPI).bluetooth().build();
                        AccessoryParameters accessoryParameters = new AccessoryParameters.Builder(AccessoryFamily.PAX).integrated().build();
                        ui.getConfiguration().setTerminalParameters(accessoryParameters);
                        ui.getConfiguration().setPrinterParameters(accessoryParameters);


            TransactionParameters transactionParameters = new TransactionParameters.Builder()
                                                            .charge(new BigDecimal("0.00"), io.mpos.transactions.Currency.EUR)
                                                            .subject("Not available" + MerchantCurrency)
                                                            .customIdentifier("123")
                                                            .build();;
                
            if (MerchantCurrency.equalsIgnoreCase("DKK")) { // Comparing the input with String.

    		transactionParameters = new TransactionParameters.Builder()
                                                            .charge(new BigDecimal(FullAmount), io.mpos.transactions.Currency.DKK)
                                                            .subject(PaymentText)
                                                            .customIdentifier(transactionidentifier)
                                                            .build();
                
            }
            else if(MerchantCurrency.equalsIgnoreCase("EUR")) {
                    transactionParameters = new TransactionParameters.Builder()
                                                            .charge(new BigDecimal(FullAmount), io.mpos.transactions.Currency.EUR)
                                                            .subject(PaymentText)
                                                            .customIdentifier(transactionidentifier)
                                                            .build();            
            
            }                        
                        
    		Intent intent = ui.createTransactionIntent(transactionParameters);
			cordova.setActivityResultCallback(this);
			cordova.getActivity().startActivityForResult(intent, MposUi.REQUEST_CODE_PAYMENT);
		}



		return true;
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {

		if (requestCode == MposUi.REQUEST_CODE_PAYMENT) {
			if (resultCode == MposUi.RESULT_CODE_APPROVED) {
				// Transaction was approved
				callbackContext.success("approved");
			} else {
				// Card was declined, or transaction was aborted, or failed
				// (e.g. no internet or accessory not found)
				callbackContext.success("declined");
			}
			// Grab the processed transaction in case you need it
			// (e.g. the transaction identifier for a refund).
			// Keep in mind that the returned transaction might be null
			// (e.g. if it could not be registered).
			//Transaction transaction = MposUi.getInitializedInstance().getTransaction();
		}
	}
}
