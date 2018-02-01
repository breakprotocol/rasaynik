<?php 
include 'connect.php';

$url =  $_SERVER['PHP_SELF'];	
$url = explode("/", $url);

if(isset($url[5]))
$service = $url[5];


if(isset($url[6]))
$method = $url[6];




$data = file_get_contents('php://input');
switch($service)
{
	case "purchase_request":
	purchase_request($method,$mysqli,$data);
	break;

	case "product_request":
	product_request($method,$mysqli,$data);
	break;

	case "raw_materials":
	raw_materials($method,$mysqli,$data);
	break;

	case "store_room_entry":
	store_room_entry($method,$mysqli,$data);
	break;


	case "store_room":
	store_room($method,$mysqli,$data);
	break;
	

	case "login":
	login($method,$mysqli,$data);
	break;


	default :
	echo "Don do this";
	break;
}

function login($method,$mysqli,$data)
{
	
	$data = json_decode($data,true);


	if($method=="login")
	{
		$username = $data['username'];
		$password = $data['password'];
		$stmt=$mysqli->prepare('SELECT * FROM user_details where user_name = ?');
		$stmt->bind_param('s', $username);
		$stmt->execute();
		$result = $stmt->get_result();
		if ($result->num_rows === 1)
		{
			$user_details = mysqli_fetch_all ($result, MYSQLI_ASSOC);
			json_encode($user_details);
			if (password_verify($password, $user_details[0]['user_pass']))	
				echo json_encode($user_details[0]['access_level']);
			else
				echo "Wrong Creds";
		}
		else
		{
			echo "Wrong Creds";
		}
		

	}

	if($method=="register")
	{
		$username = $data['username'];
		$password = $data['password'];
		$access = $data['access'];
		$password_hash = password_hash($password,PASSWORD_DEFAULT);
		$stmt = $mysqli->prepare('INSERT INTO user_details(user_name,user_pass,access_level) values (?, ?, ?)');
				$stmt->bind_param('sss',$username,$password_hash,$access);
				$result = $stmt->execute();
				if($result)
					echo $result;
				else
				{
					echo "Theres some problem inserting the new raw material";
					
				}
	}

}


function store_room($method,$mysqli,$data)
{
		$data = json_decode($data,true);

	if($method=="getCount")
	{
	// Find out how many items are in the table
		$query = "SELECT COUNT(*) FROM store_room";
    	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		$row =  $result->fetch_row();
		$total =  $row[0];
		echo $total;		
	}
	if ($method=="getAll")
	{

	 // Find out how many items are in the table
		$query = "SELECT COUNT(*) FROM store_room";
    	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		$row =  $result->fetch_row();
		$total =  $row[0];
    // How many items to list per page
    	$limit = 10;

    // How many pages will there be
    	$pages = ceil($total / $limit);
	// What page are we currently on?
    	$page = $data['page'];

    // Calculate the offset for the query
    	$offset = ($page - 1)  * $limit;




		$stmt=$mysqli->prepare('SELECT * from store_room order by id limit ? offset ?');
		$stmt->bind_param('ss', $limit,$offset);
		$stmt->execute();
		$result = $stmt->get_result();
		$store_room = mysqli_fetch_all ($result, MYSQLI_ASSOC);
	//	$purchase_order = json_encode($json );

		// foreach ($purchase_order as $key => $value) {
		// $stmt=$mysqli->prepare('SELECT * from purchase_request_raw_materials where purchase_order_id = ?');
		// $stmt->bind_param('s', $value['purchase_order_id']);
		// $stmt->execute();
		// $result = $stmt->get_result();
		// $raw_material_json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		// }
		// $purchase_order['raw_materials'] = $raw_material_json;
		echo json_encode($store_room) ;
	}

}

function store_room_entry($method,$mysqli,$data)
{

	$data = json_decode($data,true);

	if($method=="getCount")
	{
	// Find out how many items are in the table
		$query = "SELECT COUNT(*) FROM store_room_entry";
    	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		$row =  $result->fetch_row();
		$total =  $row[0];
		echo $total;		
	}
	if ($method=="getAll")
	{

	 // Find out how many items are in the table
		$query = "SELECT COUNT(*) FROM store_room_entry";
    	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		$row =  $result->fetch_row();
		$total =  $row[0];
    // How many items to list per page
    	$limit = 10;

    // How many pages will there be
    	$pages = ceil($total / $limit);
	// What page are we currently on?
    	$page = $data['page'];

    // Calculate the offset for the query
    	$offset = ($page - 1)  * $limit;




		$stmt=$mysqli->prepare('SELECT * from store_room_entry order by id limit ? offset ?');
		$stmt->bind_param('ss', $limit,$offset);
		$stmt->execute();
		$result = $stmt->get_result();
		$store_room_entry = mysqli_fetch_all ($result, MYSQLI_ASSOC);
	//	$purchase_order = json_encode($json );

		// foreach ($purchase_order as $key => $value) {
		// $stmt=$mysqli->prepare('SELECT * from purchase_request_raw_materials where purchase_order_id = ?');
		// $stmt->bind_param('s', $value['purchase_order_id']);
		// $stmt->execute();
		// $result = $stmt->get_result();
		// $raw_material_json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		// }
		// $purchase_order['raw_materials'] = $raw_material_json;
		echo json_encode($store_room_entry) ;
	}

	if($method=="decline")
	{
		
		
			$store_room_entry_id = $data['store_room_entry_id'];
			$stmt = $mysqli->prepare('UPDATE store_room_entry SET status = "Rejected" WHERE store_room_entry.id = ?');
			$stmt->bind_param('s', $data['store_room_entry_id']);
			$result = $stmt->execute();

			echo $result;
		
	
	}
		if($method=="accept")
	{
		
		
			$store_room_entry_id = $data['store_room_entry_id'];
			$stmt = $mysqli->prepare('UPDATE store_room_entry SET status = "Complete" WHERE store_room_entry.id = ?');
			$stmt->bind_param('s', $data['store_room_entry_id']);
			$result = $stmt->execute();

			if($result)
			{

				$stmt = $mysqli->prepare('SELECT * from store_room_entry where id =?');
			 	$stmt->bind_param('s',$store_room_entry_id);
			 	$stmt->execute();
				echo $result;
				$result = $stmt->get_result();
				$store_room_entry_data = mysqli_fetch_all($result, MYSQLI_ASSOC);
				echo json_encode($store_room_entry_data);
				$source_id = $store_room_entry_data[0]['source_id'];
				$name = $store_room_entry_data[0]['name'];
				$description = $store_room_entry_data[0]['description'];
				$quantity = $store_room_entry_data[0]['quantity'];
				$type = $store_room_entry_data[0]['type'];
				$quality = $store_room_entry_data[0]['quality'];
				$unit = $store_room_entry_data[0]['unit'];
				$current_timestamp = date("Y-m-d H:i:s"); 

				$stmt = $mysqli->prepare('SELECT * from store_room where source_id =?');
			 	$stmt->bind_param('s',$source_id);
			 	$stmt->execute();
				$result = $stmt->get_result();
				$store_room_data = mysqli_fetch_all ($result, MYSQLI_ASSOC);
				echo("hey");
				echo($store_room_entry_id);
				echo json_encode($store_room_data);
				if($store_room_data)
				{
					echo("ssup");
					$store_room_data_id = $store_room_data[0]['id'];
					echo($store_room_data_id);
					
					$quantity_tobe_updated = $store_room_data[0]['quantity'] + $store_room_entry_data[0]['quantity'];
					echo("fo");
					echo($quantity_tobe_updated);

					$stmt = $mysqli->prepare('UPDATE store_room SET quantity = ? WHERE id = ?');
					$stmt->bind_param('ss', $quantity_tobe_updated,$store_room_data_id);
					$result = $stmt->execute();	
					echo $result;

				}
				else
				{
						$stmt = $mysqli->prepare('INSERT INTO store_room(quantity,entry_date,last_modified,name,description,unit,type,source_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
						$stmt->bind_param('ssssssss', $quantity,$current_timestamp,$current_timestamp,$name,$description,$unit,$type,$source_id);
						$result = $stmt->execute();		
						echo $result;
					
				}
				
	
	}


}
}

function purchase_request($method,$mysqli,$data)
{	
	$data = json_decode($data, true);
	
	if($method=="getCount")
	{
	// Find out how many items are in the table
		$query = "SELECT COUNT(*) FROM purchase_request";
    	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		$row =  $result->fetch_row();
		$total =  $row[0];
		echo $total;		
	}
	if ($method=="getAll")
	{

	 // Find out how many items are in the table
		$query = "SELECT COUNT(*) FROM purchase_request";
    	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		$row =  $result->fetch_row();
		$total =  $row[0];
    // How many items to list per page
    	$limit = 10;

    // How many pages will there be
    	$pages = ceil($total / $limit);
	// What page are we currently on?
    	$page = $data['page'];

    // Calculate the offset for the query
    	$offset = ($page - 1)  * $limit;




		$stmt=$mysqli->prepare('SELECT * from purchase_request order by date desc limit ? offset ?');
		$stmt->bind_param('ss', $limit,$offset);
		$stmt->execute();
		$result = $stmt->get_result();
		$purchase_order = mysqli_fetch_all ($result, MYSQLI_ASSOC);
	//	$purchase_order = json_encode($json );

		// foreach ($purchase_order as $key => $value) {
		// $stmt=$mysqli->prepare('SELECT * from purchase_request_raw_materials where purchase_order_id = ?');
		// $stmt->bind_param('s', $value['purchase_order_id']);
		// $stmt->execute();
		// $result = $stmt->get_result();
		// $raw_material_json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		// }
		// $purchase_order['raw_materials'] = $raw_material_json;
		echo json_encode($purchase_order) ;
	}

	if ($method=="getOne")
	{

		$purchase_order_id = $data['purchase_order_id'];
		$stmt=$mysqli->prepare('SELECT * from purchase_request where purchase_order_id = ?');
		$stmt->bind_param('s', $purchase_order_id);
		$stmt->execute();
		$result = $stmt->get_result();
		$purchase_order = mysqli_fetch_all ($result, MYSQLI_ASSOC);
	//	$purchase_order = json_encode($json );

		foreach ($purchase_order as $key => $value) {
		$stmt=$mysqli->prepare('SELECT * from purchase_request_raw_materials where purchase_order_id = ?');
		$stmt->bind_param('s', $purchase_order_id);
		$stmt->execute();
		$result = $stmt->get_result();
		$raw_material_json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		}
		$purchase_order['raw_materials'] = $raw_material_json;
		echo json_encode($purchase_order) ;	
	}

	if ($method=="create")
	{
		
		// //Getting the data 
		 $purchase_order_id = $data['purchase_order_id'];
		$purchase_order_to = $data['purchase_order_to'];
		$date = $data['date'];
		$qtn_Dt = $data['qtn_Dt'];
		
		$req_Dt = $data['req_Dt'];

		$unit = $data['unit'];

		$payment = $data['payment'];
		$transport = $data['transport'];
		$delivery_schedule = $data['delivery_schedule'];
		$raw_materials = $data['raw_materials'];
		$totalAmt = $data['totalAmt'];
		



		$stmt = $mysqli->prepare('INSERT INTO purchase_request(purchase_order_id,purchase_order_to,date,qtn_Dt,req_Dt,unit,payment,transport,delivery_schedule,totalAmt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$stmt->bind_param('ssssssssss', $purchase_order_id,$purchase_order_to,$date,$qtn_Dt,$req_Dt,$unit,$payment,
			$transport,$delivery_schedule,$totalAmt);
				$result = $stmt->execute();		
		
		if($result)
		{
			foreach ($raw_materials as $key => $value) {
			$raw_material_id = $value['raw_material']['raw_material_id'];
			$raw_material_name = $value['raw_material']['raw_material_name'];

			if(empty($raw_material_id))
			{
				
				$max_raw_material_id =  $mysqli->query("select max(ID) ID from raw_materials")->fetch_object()->ID;
				$max_raw_material_id++;
				$stmt = $mysqli->prepare('INSERT INTO raw_materials(id,name) values (?,?)');
				$stmt->bind_param('ss',$max_raw_material_id,$raw_material_name);
				$result = $stmt->execute();
				if($result)
					$raw_material_id = $max_raw_material_id;
				else
				{
					echo "Theres some problem inserting the new raw material";
					break;
				}
			}
			$stmt = $mysqli->prepare('INSERT INTO purchase_request_raw_materials(purchase_order_id,raw_material_id,raw_material_name,raw_material_desc,raw_material_qty,raw_material_unit,raw_material_rate,raw_material_amt,raw_material_quality) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
			
			$stmt->bind_param('sssssssss', $purchase_order_id,$raw_material_id,$value['raw_material']['raw_material_name'],$value['raw_material_desc'],$value['raw_material_qty'],$value['raw_material_unit'],$value['raw_material_rate'],$value['raw_material_amt'],$value['raw_material_quality']);
			
			$result = $stmt->execute();
			echo json_encode($result);				
			}
		}
		else

		{
			echo "Problem inserting data";
		}
	}

	// if ($method=="delete")
	// {

	// 	$request_id = $data['request_id'];
	// 	$stmt = $mysqli->prepare('DELETE FROM po_request WHERE request_id = ?');
	// 	$stmt->bind_param('s', $request_id);
	// 	$result = $stmt->execute();
	// 	echo json_encode($result);
	// }

	if($method=="update")
	{
		$query = "UPDATE po_request SET";
		$comma = " ";
		$request_id = $data['request_id'];
		$whitelist = array(
			'product_name',
			'quality_check',
			'quantity_check',
			'raw_materials'
		);

		foreach($data as $key => $val) {
			if( ! empty($val) && in_array($key, $whitelist)) {
				$query .= $comma . $key . " = '" . $mysqli->real_escape_string(trim($val)) . "'";
				$comma = ", ";
			}
		}
		$query .= " where request_id = ?";
		$stmt = $mysqli->prepare($query);
		$stmt->bind_param('s', $request_id);
		$result = $stmt->execute();

		echo $result;
	}

	if($method=="approve")
	{
		
		$purchase_order_id = $data['purchase_order_id'];
		if($data['type']=="full")
		{
			$stmt = $mysqli->prepare('UPDATE purchase_request SET status = "Complete" WHERE purchase_order_id = ?');
			$stmt->bind_param('s', $data['purchase_order_id']);
			$result = $stmt->execute();
			if($result)
			{
				$stmt = $mysqli->prepare('UPDATE purchase_request_raw_materials SET status = "Complete" WHERE purchase_order_id = ?');
				$stmt->bind_param('s', $data['purchase_order_id']);
				$result = $stmt->execute();
			}
			 if($result)
			 {
			 	$stmt = $mysqli->prepare('SELECT raw_material_id from purchase_request_raw_materials where purchase_order_id =?');
			 	$stmt->bind_param('s',$data['purchase_order_id']);
			 	$stmt->execute();
				$result = $stmt->get_result();
				$raw_material_entry_data = mysqli_fetch_all ($result, MYSQLI_ASSOC);
				json_encode($raw_material_entry_data);
				foreach ($raw_material_entry_data as $key => $value) {
					$raw_material_id = $value['raw_material_id'];
					INSERT_STORE_ROOM_ENTRY("raw_materials",$raw_material_id,$purchase_order_id,$mysqli);
				}
			}
			 else
			 {
			 	echo "Issue while approving";
			 }
		}
		else if($data['type']=="partial")
		{
			$stmt = $mysqli->prepare('UPDATE purchase_request SET status = "Partial" WHERE purchase_order_id = ?');
			$stmt->bind_param('s', $data['purchase_order_id']);
			$result = $stmt->execute();
			
			if($result)
			{
				//print_r($data);
				$raw_materials = $data['raw_materials'];

				foreach ($raw_materials as $key => $value) {
					
					$raw_material_id = $value['raw_material_id'];
					$status = $value['status'];
					
					$stmt = $mysqli->prepare('UPDATE purchase_request_raw_materials SET status = ? WHERE purchase_order_id = ? and raw_material_id = ?');
					$stmt->bind_param('sss', $status,$purchase_order_id,$raw_material_id);
					$result = $stmt->execute();
					
					if($result)
					{
						if($status == 'approve')
						{
							
							INSERT_STORE_ROOM_ENTRY("raw_materials",$raw_material_id,$purchase_order_id,$mysqli);
						}
					}
				}

		}
	}
}

		if($method=="decline")
		{
		
		if($data['type']=="full")
		{
			$purchase_order_id = $data['purchase_order_id'];
			$stmt = $mysqli->prepare('UPDATE purchase_request SET status = "Rejected" WHERE purchase_order_id = ?');
			$stmt->bind_param('s', $data['purchase_order_id']);
			$result = $stmt->execute();
			if($result)
			{
				$stmt = $mysqli->prepare('UPDATE purchase_request_raw_materials SET status = "Rejected" WHERE purchase_order_id = ?');
				$stmt->bind_param('s', $data['purchase_order_id']);
				$result = $stmt->execute();
			}
			echo $result;
		}
	
	}

	// function INSERT_STORE_ROOM_ENTRY($type,$entry_data)
	// {
	// 	echo "hey";
	// 	if($type == "raw_materials")
	// 	{	
	// 		echo "raw_materials" ;
			
	// 	}
	// }

	

}
function INSERT_STORE_ROOM_ENTRY($type,$raw_material_id,$purchase_order_id,$mysqli)
	{
		
		if($type == "raw_materials")
		{	
			
			$stmt = $mysqli->prepare('SELECT * FROM purchase_request_raw_materials WHERE raw_material_id = ? and purchase_order_id = ?');
			$stmt->bind_param('ss', $raw_material_id,$purchase_order_id);
			$stmt->execute();
			$result = $stmt->get_result();
			$entry_data = mysqli_fetch_all ($result, MYSQLI_ASSOC);
			json_encode($entry_data);
			$name = $entry_data[0]['raw_material_name'];
			$description = $entry_data[0]['raw_material_desc'];
			$quantity = $entry_data[0]['raw_material_qty'];
			$type = "raw_materials";
			$quality = $entry_data[0]['raw_material_quality'];
			$unit = $entry_data[0]['raw_material_unit'];
			$source_id = $entry_data[0]['raw_material_id'];
				
		}
		
		$stmt = $mysqli->prepare('INSERT INTO store_room_entry(name,description,quantity,type,quality,source_id,unit) values (?,?,?,?,?,?,?)');
		$stmt->bind_param('sssssss',$name,$description,$quantity,$type,$quality,$source_id,$unit);
		$result = $stmt->execute();
		if($result)
		{
			echo "1";
		}
		else
		{
			echo "Some issue while inserting in entry point of store room";
		}

	}


function product_request($method,$mysqli,$data)
{	
	echo $data;
	$data = json_decode($data, true);
	
	if ($method=="getAll")
	{
		$query="select * from po_request";
		$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		$json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		echo json_encode($json );
	}

	if ($method=="getOne")
	{

		$stmt = $mysqli->prepare('SELECT * FROM product_request WHERE request_id = ?');
		$stmt->bind_param('s', $data['request_id']);
		$stmt->execute();
		$result = $stmt->get_result();
		$json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		echo json_encode($json );

		// echo "pp";
		// $query="select * from categories where _id=" + $data['_id'];
		// echo $query;
		// $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		// $json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		// echo json_encode($json );
	}

	if ($method=="create")
	{
		
		//Getting the data 
		$created_date = date('Y-m-d H:i:s');
		$product_name = $data['product_name'];
		
		$byproduct_name = $data['byproduct_name'];
		$raw_materials = $data['raw_materials'];
		$request_date = $data['request_date'];
		$request_confirmation = $data['request_confirmation'];
		$product_quantity = $data['product_quantity'];
	
		$stmt = $mysqli->prepare('INSERT INTO product_request (product_name,byproduct_name, raw_materials,request_date,request_confirmation,product_quantity) VALUES (?, ?,?)');
		$stmt->bind_param('sss', $created_date,$product_name,$raw_materials);
		$result = $stmt->execute();
		echo json_encode($result);
	}

	if ($method=="delete")
	{

		$request_id = $data['request_id'];
		$stmt = $mysqli->prepare('DELETE FROM po_request WHERE request_id = ?');
		$stmt->bind_param('s', $request_id);
		$result = $stmt->execute();
		echo json_encode($result);
	}

	if($method=="update")
	{
		$query = "UPDATE po_request SET";
		$comma = " ";
		$request_id = $data['request_id'];
		$whitelist = array(
			'product_name',
			'quality_check',
			'quantity_check',
			'raw_materials'
		);

		foreach($data as $key => $val) {
			if( ! empty($val) && in_array($key, $whitelist)) {
				$query .= $comma . $key . " = '" . $mysqli->real_escape_string(trim($val)) . "'";
				$comma = ", ";
			}
		}
		$query .= " where request_id = ?";
		$stmt = $mysqli->prepare($query);
		$stmt->bind_param('s', $request_id);
		$result = $stmt->execute();

		echo $result;
	}

}
function raw_materials($method,$mysqli,$data)
{
		$data = json_decode($data, true);
	
		if ($method=="getAll")
		{
		$query="select * from raw_materials";
		$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
		$json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		echo json_encode($json );
		}

}



?>