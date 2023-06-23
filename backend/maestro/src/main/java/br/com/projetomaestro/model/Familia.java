package br.com.projetomaestro.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tb_familia")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Familia {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long codigo;
	
	private String descricao;
	
	@OneToMany(mappedBy = "familia")
	private List<Pessoa> pessoas;
	
	
}
