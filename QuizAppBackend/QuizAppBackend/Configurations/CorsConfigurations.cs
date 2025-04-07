public static class CorsConfigurationExtensions
{
  public static IServiceCollection ConfigureCors(this IServiceCollection services)
  {
    services.AddCors(options =>
    {
      options.AddPolicy("AllowAllOrigins",
          builder =>
          {
            builder.AllowAnyOrigin()
                         .AllowAnyHeader()
                         .AllowAnyMethod();
          });
    });

    return services;
  }
}
