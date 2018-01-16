<?php 
include 'connect.php';

$url =  $_SERVER['PHP_SELF'];	
$url = explode("/", $url);

if(isset($url[4]))
$service = $url[4];


if(isset($url[5]))
$method = $url[5];


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

	case "upload":
	uploadImage($method,$mysqli,$data);
	break;

	default :
	echo "Don't do this";
	break;
}


function purchase_request($method,$mysqli,$data)
{	
	$data = json_decode($data, true);
	
	if ($method=="getAll")
	{

	 // Find out how many items are in the table
		$query = "SELECT COUNT(*) FROM po_request";
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




		$stmt=$mysqli->prepare('SELECT * from po_request order by created_date desc limit ? offset ?');
		$stmt->bind_param('ss', $limit,$offset);
		$stmt->execute();
		$result = $stmt->get_result();
		$json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		echo json_encode($json );
	}

	if ($method=="getOne")
	{

		$stmt = $mysqli->prepare('SELECT * FROM po_request WHERE request_id = ?');
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
		



		$stmt = $mysqli->prepare('INSERT INTO purchase_request(purchase_order_id,purchase_order_to,date,qtn_Dt,req_Dt,unit,payment,transport,delivery_schedule) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$stmt->bind_param('sssssssss', $purchase_order_id,$purchase_order_to,$date,$qtn_Dt,$req_Dt,$unit,$payment,
			$transport,$delivery_schedule);
				$result = $stmt->execute();		
		
		if(json_encode($result))
		{
			foreach ($raw_materials as $key => $value) {
			$stmt = $mysqli->prepare('INSERT INTO purchase_request_raw_materials(purchase_order_id,raw_material_id,raw_material_name,raw_material_desc,raw_material_qty,raw_material_unit,raw_material_rate,raw_material_amt,raw_material_quality) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
			
			$stmt->bind_param('sssssssss', $purchase_order_id,$value['raw_material_id'],$value['raw_material_name'],$value['raw_material_desc'],$value['raw_material_qty'],$value['raw_material_unit'],$value['raw_material_rate'],$value['raw_material_amt'],$value['raw_material_quality']);
			
			$result = $stmt->execute();
			echo json_encode($result);				
			}
		}
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