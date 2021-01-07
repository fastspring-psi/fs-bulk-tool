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
 *  Controller class for the /products endpoint
 */

class ProductsController extends AbstractController
{
    /*
     *  It forwards the POST data sent by the client to the /products endpoint
     */
    public function updateProducts(Request $request) {
        $credentials = AuthRequest::getCredentials($request);
        $products = $request->request->all();

        if (!(isset($products))){
            return new Response('', 400);
        }
        $fsApi = new FSApi($credentials);
        $response = $fsApi->post('products', $products);
        return new JsonResponse(['success' => true, 'response' => $response]);
    }
}
