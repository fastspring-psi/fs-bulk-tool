<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Config\Definition\Exception\Exception;

use App\Utils\FSApi;
use App\Utils\Cryptor;
use App\Utils\AuthRequest;

/*
 *  Controller class for the /accounts endpoint
 */
class PortalController extends AbstractController
{
    public function login(Request $request) {
        try {
            $username = $request->request->get('username');
            $password = $request->request->get('password');
            if(!(isset($username) && isset($password))){
                return new JsonResponse([
                    'success' => false,
                    'error' => 'Missing params in request'
                ]);
            }

            // Try to retrieve data from API
            // This way we confirm that the credentials are correct
            $credentials = array(
                'username' => $username,
                'password' => $password
            );
            $fsApi = new FSApi($credentials);
            $products = $fsApi->get('products/');

            // Confirm that credentials are correct by get all products
            if(!isset($products)){
              return new JsonResponse([
                  'success' => false,
                  'error' => $products['error']
              ]);
            }
            // Dumby portal ID
            // TO DO: Store unique portal ID to prevent duplicates
            //$portalId = uniqid();
            // Create token
            $cryptor = new Cryptor();
            $token = $cryptor->encrypt($username.":".$password);
            // Return credentials in encrypted token
            return new JsonResponse(['success' => true, 'token' => $token]);
        } catch (Exception $e) {
            return new JsonResponse(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    //TODO add multiple page handling
    public function getPortalDetails(Request $request){
      try {
        // Check credentials from URL
        $credentials = AuthRequest::getCredentials($request);

        // Get product information from API
        $fsApi = new FSApi($credentials);
        $result = $fsApi->get('products/');

        $products = [];
        if (count($result['products']) > 0) {
          $productPaths = join(',', $result['products']);
          $products = $fsApi->get('products/'.$productPaths)['products'];
        }

        return new JsonResponse([
          'success' => true,
          'products' => $products
        ]);
      } catch (Exception $e) {
        return new JsonResponse(['success' => false, 'error' => $e->getMessage()]);
      }
    }
}
