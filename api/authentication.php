<?php

$slim->add(function ($request, $response, $next) use ($mysql) {
    $path = $request->getUri()->getPath();

    if ($request->getMethod() == "OPTIONS") {
        return $next($request, $response);
    }
    $id = $request->getHeaderLine("token");
    $tokens = $mysql->xpn_user->where("usr_token like ?", $id);
    if (count($tokens) != 0) {
        return $next($request, $response);
    }
    return $response->withJson(array("success" => false, "message" => "token not valid $id"))->withStatus(401);
});
?>