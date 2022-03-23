using SignalR.Demo.Back.Hubs;
using SignalR.Demo.Back.Jobs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(builder =>
        builder.WithOrigins("http://localhost:9000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
    )
);

builder.Services.AddHostedService<RugbyService>();
builder.Services.AddHostedService<MoviesService>();

// Add SignalR
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.UseCors();

// Configure SignalR Hubs
app.MapHub<ChatHub>("/chathub");
app.MapHub<RugbyHub>("/rugbyhub");
app.MapHub<MoviesHub>("/movieshub");

app.Run();
