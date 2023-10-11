<?php

namespace Tests\Feature;

use GuzzleHttp\Psr7\Response;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function to_test_login(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    public function test_user_can_not_sign_up_on_validation_error()
    {
        //        $this->withoutExceptionHandling();

        $user = [
            'firstName' => '',
            'lastName' => '',
            'email' => '',
            'password' => '',
        ];
        $this->postJson('api/register', $user)
            ->assertStatus(422)
            ->assertJson(function (AssertableJson $json) use ($user) {
                $json->has('message')
                    ->has('errors', 4) // it will check the exact size of the errors bag
                    ->whereAllType([
                        'errors.firstName' => 'array',
                        'errors.lastName' => 'array',
                        'errors.password' => 'array',
                        'errors.email' => 'array',
                    ]);
            });
    }
}
