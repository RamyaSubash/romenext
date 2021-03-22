package com.els.romenext.api.utils.json;

import com.els.romenext.core.util.date.RomeDateUtils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class RomeGsonUtils {
	
	
	private static final GsonBuilder GSON_BUILDER_DEFAULT;
	
	static {
		// build the builder
		GSON_BUILDER_DEFAULT = new GsonBuilder();
		GSON_BUILDER_DEFAULT.setDateFormat( RomeDateUtils.ROME_DEFAULT_DATE_FORMAT );
	}
	
	public static Gson getDefaultGson() {
		
		return GSON_BUILDER_DEFAULT.create();
		
	}

}
