import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {

  pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService) { }
  ngOnInit(): void {
  this.pokemonService.getPokemonList().subscribe(data => {
    const detailRequests = data.results.map((pokemon: any) =>
      fetch(pokemon.url).then(res => res.json())
    );

    Promise.all(detailRequests).then((detailedData: any[]) => {
      this.pokemonList = detailedData; // now each Pokémon has sprites
    });
  });
}
}