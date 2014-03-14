
import java.io.*;
import org.jruby.embed.ScriptingContainer;


public class Main {

	
	public static void main(String[] args) throws IOException {
		ScriptingContainer container = new ScriptingContainer();
		String script="";
		String script1="";
		
		try {
			BufferedReader br = new BufferedReader(new FileReader("script23.rb"));
			
			while ((script = br.readLine()) != null) {
				script1 += script + "\n"; 
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
	    String name  = "Carlos";  
	    String lastName = " Pedro";
	    StringBuilder stringBuilder = new StringBuilder();
	    stringBuilder.append(name);
	    stringBuilder.append(lastName);
		InputStream inputStream  = new ByteArrayInputStream(stringBuilder.toString().getBytes("UTF-8")); 
		Reader reader = new InputStreamReader(inputStream);
		container.setInput(reader);
		
		container.runScriptlet(script1);


        
        
       
       	}
}
