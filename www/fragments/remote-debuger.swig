{#
	Enable remote debuger for mobile deviloping.
	weinre --boundHost 192.168.1.111
#}
     <script type="text/javascript">
           window.onerror=function(msg, url, line, col, error){
                console.log("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra)
                alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra)
           }
     </script> 
     <script src="http://192.168.1.111:8080/target/target-script-min.js#anonymous"></script>
 