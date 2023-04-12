package utils;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
//import com.alibaba.fastjson.JSONObject;

public class JsonUtil {
	public static JSONObject toJsonString(int totalCount, List<?> obj) throws JSONException {  
        if(null == obj) {  
            JSONObject jsonResult = new JSONObject();  
            jsonResult.put("total", totalCount);  
            jsonResult.put("rows", new JSONArray());  
            return jsonResult;  
        }  
        if(!Collection.class.isAssignableFrom(obj.getClass())) {  
            JSONObject jsonResult = new JSONObject();  
            jsonResult.put("total", totalCount);  
            jsonResult.put("rows", new JSONArray());  
            return jsonResult;  
        }  
       // System.out.println(obj);
        JSONArray jsonArray = JSONArray.parseArray(JSON.toJSONString(obj)) ; 
        JSONObject jsonResult = new JSONObject();  
        jsonResult.put("total", totalCount);  
        jsonResult.put("rows", jsonArray);   
        return jsonResult;  
    } 
	public static String toJsonString(Object obj) {  
        String json = null;  
        try {  
            ObjectMapper mapper = new ObjectMapper();  
            json = mapper.writeValueAsString(obj);  
        } catch (JsonGenerationException e) {  
            e.printStackTrace();  
        } catch (JsonMappingException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        return json;  
    } 
}
