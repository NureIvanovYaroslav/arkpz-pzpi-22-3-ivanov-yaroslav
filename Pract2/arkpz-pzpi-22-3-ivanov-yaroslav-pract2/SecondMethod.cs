//До рефакторингу
[HttpPost("register")]
[SwaggerOperation("Register user")]
public async Task<IActionResult> Register([FromBody] RegistrationUserRequest request)
{
    if (!ModelState.IsValid)
    {
        return BadRequest("Invalid model state.");
    }

    var userResult = await _authService.Register(request.Username, request.Password, request.Email);

    if (userResult == null)
    {
        return StatusCode(500, "Registration failed due to an internal error.");
    }
    if (userResult.IsDuplicateEmail)
    {
        return BadRequest("Email is already in use.");
    }
    if (userResult.IsWeakPassword)
    {
        return BadRequest("Password is too weak.");
    }

    return Ok(userResult);
}

//Після рефакторингу
[HttpPost("register")]
[SwaggerOperation("Register user")]
public async Task<IActionResult> Register([FromBody] RegistrationUserRequest request)
{
    try
    {
        if (!ModelState.IsValid)
        {
            throw new ArgumentException("Invalid model state.");
        }

        var userResult = await _authService.Register(request.Username, request.Password, request.Email);

        return Ok(userResult);
    }
    catch (DuplicateEmailException)
    {
        return BadRequest("Email is already in use.");
    }
    catch (WeakPasswordException)
    {
        return BadRequest("Password is too weak.");
    }
    catch (ArgumentException e)
    {
        return BadRequest(e.Message);
    }
    catch (Exception e)
    {
        return StatusCode(500, $"Registration failed: {e.Message}");
    }
}